const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
  entry: String,
  date: String,
});

const Journal = mongoose.model('Journal', JournalSchema);

module.exports = {Journal} 