var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId,
        User = require('./userModel.js');

var Schema = mongoose.Schema;

var happinessSchema = new mongoose.Schema({
  date: { type: Date },
  happinessLevel: {type: Number, min: 0, max: 100},
  keyWord: {type: String},
  entry: {type: String},
  parentUser : { type: ObjectId, ref: 'User'}
});

var Happiness = mongoose.model('Happiness', happinessSchema);
module.exports = Happiness;
