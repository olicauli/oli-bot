var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//represents a discord user -- to be used for author and editor fields
var userModel = new Schema(
    {
        clientId: Number
    });
    
module.exports = mongoose.model('user', userModel);