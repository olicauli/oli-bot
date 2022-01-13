//most of this code is modified from this youtube video:
//https://www.youtube.com/watch?v=Bg1d2ho2pgY
require('dotenv').config();
const mongoose = require('mongoose');
const password = process.env.DB_PASS;
const username = process.env.DB_USERNAME;

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        
        try {
            mongoose.connect(`mongodb+srv://${username}:${password}@oli-bot.ly0c1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
            //mongoose.set('useFindAndModify', false);
            mongoose.Promise = global.Promise;
        }   
        catch (err) {
            console.log(err);
        }
        finally {
            //ensures that the client will close when you finish/error
            mongoose.disconnect();
        }
        
        
        mongoose.connection.on('connected', () => {
            console.log('the bot has connected to the database.');
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('the bot has disconnected from the database.');
        });
        
        mongoose.connection.on('err', (err) => {
            console.log('there was an error with the connection to the database: ' + err);
        });
    }
}