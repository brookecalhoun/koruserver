const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    auth0Id: String,
    journalEntries: [],
})

const User = mongoose.model('User', userSchema);

module.exports = User;