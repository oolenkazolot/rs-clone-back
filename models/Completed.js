const { Schema, model } = require('mongoose');

const schema = new Schema({
  userId: { type: String, required: true },
  idComplex: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: Number, required: true },
});

module.exports = model('Completed', schema);
