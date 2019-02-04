const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Note = new Schema({
  titleValue: {
    type: String,
    required: true
  },
  descriptionValue: {
    type: String,
    required: true
  },
  editing: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Note', Note);