const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let listModel = new Schema({
        name: { type: String, required: true, maxLength: 60 },
        title: { type: String, maxLength: 60 }, //display as the title of the embed
        author: { type: Schema.Types.ObjectId, ref: 'author' }, //original creator of the list
        isPublic: Boolean, //whether anyone can edit it or only users with permissions
        editors: [{ type: Schema.Types.ObjectId, ref: 'editor'}], //users with permission to change items on the list
        items: [String], //actual items on the list
        datesAdded: [Date]
    });

module.exports = mongoose.model('list', listModel);