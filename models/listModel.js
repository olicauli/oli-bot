const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var listModel = new Schema(
    {
        name: { type: String, required: true, maxLength: 60 },
        title: { type: String, maxLength: 60 },
        author: { type: Schema.Types.ObjectId, ref: 'author' },
        isPublic: Boolean,
        editors: [{ type: Schema.Types.ObjectId, ref: 'editor'}],
        items: [String],
        datesAdded: [Date]
    });

module.exports = mongoose.model('list', listModel);