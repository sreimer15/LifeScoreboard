var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId,
        User = require('./userModel.js');

var Schema = mongoose.Schema;

var demographicsModel = new mongoose.Schema({
  parentUser : { type: ObjectId, ref: 'User'},
  age: {type: Number, min:0, max:125 },
  gender: {type: String},
  occupationType: {type: String},
  salary: {type: Number, default: 0},
  ethnicity: {type: String},
  education: {type: String},
  maritalStatus: {type: String},
  religion: {type: String},
  // More Personal Questions
  sexLevel: {type: Number}, // How often you have sex
  caffeineIntake: { type: Number },
  netWorth: {type: Number},
  facebook: {type: Number} 
});


var Demographics = mongoose.model('Demographics', demographicsModel);
module.exports = Demographics;