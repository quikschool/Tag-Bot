const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const tagSchema = mongoose.Schema({
    tagName: reqString,
    tag: reqString,
    tagInfo: String,
    tagAuthor: reqString,
    guildId: reqString
})

module.exports = mongoose.model('tags', tagSchema);