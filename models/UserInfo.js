const { Schema, model } = require('mongoose');

const schema = new Schema({
  userId: { type: String, required: true },
  goal: { type: String, required: true },
  timeRest: { type: String, required: true },
  load: { type: String, required: true },
  weight: { type: String, required: true },
  height: { type: String, required: true },
  units: { type: String, required: true },
});

module.exports = model('UserInfo', schema);
