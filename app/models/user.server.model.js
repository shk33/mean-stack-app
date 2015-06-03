var mongoose = require('mongoose'),
    urlFormatter = require('../../app/models/url_formatter.server.model'),
    Schema = mongoose.Schema;
    
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: {
      type: String,
      trim: true
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

UserSchema.set('toJSON', { getters: true , virtuals: true });
mongoose.model('User', UserSchema);