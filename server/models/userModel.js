var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
    ObjectId = mongoose.Schema.ObjectId,
      Happiness = require('./happinessModel.js'),
        Demographics = require('./demographicsModel.js')

// var deepPopulate = require('mongoose-deep-populate')(mongoose);
// To get to deep levels of nested population

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  name: {
    first: String,
    last: String
  },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  happiness: [ { type: ObjectId, ref: 'Happiness'} ],
  demographics: { type: ObjectId, ref: 'Demographics'}
});

userSchema.methods.hashPassword = function(password, callback) {
  var hash = bcrypt.hash(password, null, null, function(err, hash) {
    callback(hash);
  });
};

userSchema.methods.comparePassword = function(attempt, hash, callback) {
  bcrypt.compare(attempt, hash, function(err, res) {
    callback(res);
  });
};

var User = mongoose.model('User', userSchema);
module.exports = User;