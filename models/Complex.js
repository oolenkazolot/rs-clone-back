const { Schema, model } = require('mongoose');

const schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = model('Complex', schema);
