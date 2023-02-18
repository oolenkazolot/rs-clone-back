const { Schema, model } = require('mongoose');

const schema = new Schema({
  idComplex: { type: String, required: true },
  idExercise: { type: String, required: true },
  count: { type: String, required: true },
});

module.exports = model('Exercise', schema);
