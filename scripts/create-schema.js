//
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

var mongoose = require('mongoose');

//define a schema
var Schema = mongoose.Schema;

//represents a discord user -- to be used for author and editor fields
var user = new Schema(
    {
        clientId: Number
    });

//create a new schema
var list = new Schema(
    {
        name: { type: String, required: true, maxLength: 60 },
        title: { type: String, maxLength: 60 },
        author: { type: Schema.Types.ObjectId, ref: 'author' },
        isPublic: Boolean,
        editors: [{ type: Schema.Types.ObjectId, ref: 'editor'}],
        items: [String],
        datesAdded: [Date]
    });
    
var listModel = mongoose.model('list', list);

//create an instance of the list
var testInstance = new listModel({ name: "testlist" });

//save the instance to the database
testInstance.save(err => {
    if (err) return console.log(err);
});