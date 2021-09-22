const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
const JournalSchema = new Schema({
  entries: [],
  date: String,
});

const Journal = mongoose.model('Journal', JournalSchema);
const Entry = mongoose.model('Entry', EntrySchema)

module.exports = {Journal, Entry } 