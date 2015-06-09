var mongoose = require('mongoose'),
    urlFormatter = require('../../app/models/url_formatter.server.model'),
    Schema = mongoose.Schema;
    
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
     type: String,
     index: true,
     match: /.+\@.+\..+/
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true
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
});

// You add Static methods this way
/*UserSchema.statics.findOneByUsername = function (username, callback) {
  this.findOne({ username: new RegExp(username, 'i') }, callback);
};*/

// You add instance methods this way
/*UserSchema.methods.authenticate = function(password) {
return this.password === password;
};*/
UserSchema.post('save', function(next) {
  if(this.isNew) {
    console.log('A new user was created.');
  } else {
    console.log('A user updated is details.');
  }
});

UserSchema.set('toJSON', { getters: true , virtuals: true });
mongoose.model('User', UserSchema);