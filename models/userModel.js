const mongoose = require('mongoose');

let Schema = mongoose.Schema;

//represents a discord user -- to be used for author and editor fields
let userModel = Schema(
    {
        username: String,
        userId: Number, //discord id found from devtools
        lists: [{ type: Schema.Types.ObjectId, ref: 'list' }] //lists this user has permission to edit
    });
    
module.exports = mongoose.model('user', userModel);