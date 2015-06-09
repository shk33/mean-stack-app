var mongoose = require('mongoose'),
    urlFormatter = require('../../app/models/url_formatter.server.model'),
    Schema = mongoose.Schema;
    
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
     type: String,
     index: true 
    },
    username: {
      type: String,
      trim: true,
      unique: true
    },
    password: String,
    created: {
      type: Date,
      default: Date.now
    },
    website: {
      type: String,
      set: urlFormatter.addHttpIfNotPresent,
      get: urlFormatter.addHttpIfNotPresent
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

UserSchema.set('toJSON', { getters: true , virtuals: true });
mongoose.model('User', UserSchema);