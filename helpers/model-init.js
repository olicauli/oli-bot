require('dotenv').config();
const mongoose = require('mongoose');
const listM = require('../models/listModel.js')
const userM = require('../models/userModel.js')

const password = process.env.DB_PASS;
const username = process.env.DB_USERNAME;
const cluster = process.env.CLUSTER_NAME;
const db = process.env.DB;

console.log(username);
console.log(password);
const mongoDB = `mongodb+srv://${username}:${password}@${cluster}.ly0c1.mongodb.net/${db}?retryWrites=true&w=majority`;
console.log(mongoDB);

mongoose.connect(mongoDB, 
                { useNewUrlParser: true , 
                  useUnifiedTopology: true});
                  
async function fuck()
{
    try 
    {
        let db = mongoose.connection;
        console.log("connected to db")
        let testList = mongoose.model('list', listM.listModel);
        testList.name = "test";
        await testList.save();
        console.log(testList);
    }
    catch (err) 
    {
        console.log(err);
    }
    finally 
    {
        console.log("disconnected from db")
        mongoose.disconnect;
    }
}
