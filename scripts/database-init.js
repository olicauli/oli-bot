//NOTE: THIS REQUIRE NEEDS TO HAVE THE PATH TO .ENV IN ITS CONFIG.
//otherwise, it simply returns the variables as undefined
require('dotenv').config({ path: '../.env' });
const { Sequelize } = require('sequelize');
const usrModel = require('../models/user.js');
const list = require('../models/list.js');

//console.log(process.env);

/*
const pass = process.env.DB_PASS;
const user = process.env.DB_USER
const dbname = process.env.DB;

const sequelize = new Sequelize(dbname, user, pass, {
    host: 'localhost',
    dialect: 'postgres'
});
*/

sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

//console.log('before async');

(async () => {
    //console.log('in async');
    try {
        await sequelize.authenticate();
        console.log('successfully connected to database!');
        //sequelize.sync makes tables for all models, destroying
        //ones that already exist if it finds it. you probably
        //don't wanna run this more than once

        await sequelize.sync({ force: true });
        //once i understand stuff this might be a better option:
        //https://sequelize.org/master/manual/migrations.html
    }
    catch (err) {
        console.log(err);
    }
    finally {
        console.log('closing connection...');
        sequelize.close();
        console.log('closed!');
    }
})();

module.exports = { sequelize };