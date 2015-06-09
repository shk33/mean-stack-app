var mongoose = require('mongoose'),
    crypto = require('crypto'),
    urlFormatter = require('../../app/models/url_formatter.server.model'),
    Schema = mongoose.Schema;
    
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
     type: String,
     match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
    username: {
      type: String,
      unique: 'Username is required',
      required: true,
      trim: true
    },
    password: {
      type: String,
      validate: [
        function (password) {
          return password.length >= 6;
        },
        'Password should be at least 6 characters long.'
      ]
    },
    salt: {
      type: String
    },
    provider: {
      type: String,
      required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    created: {
      type: Date,
      default: Date.now
    },
    website: {
      type: String,
      set: urlFormatter.addHttpIfNotPresent,
      get: urlFormatter.addHttpIfNotPresent
    },
    role: {
      type: String,
      enum: ['Admin', 'Owner', 'User']
    }
  });

UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
  var splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

// You add Static methods this way
/*UserSchema.statics.findOneByUsername = function (username, callback) {
  this.findOne({ username: new RegExp(username, 'i') }, callback);
};*/

// You add instance methods this way
/*UserSchema.methods.authenticate = function(password) {
return this.password === password;
};*/

UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new
      Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000,64).
  toString('base64');
};

UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix,
  callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) +
          1, callback);
      }
    } else {
      callback(null);
    }
  });
};

UserSchema.set('toJSON', { getters: true , virtuals: true });
mongoose.model('User', UserSchema);