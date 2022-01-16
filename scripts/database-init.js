require('dotenv').config({ path: '../.env' });
const { Sequelize } = require('sequelize');

//console.log(process.env);

const pass = process.env.DB_PASS;
const user = process.env.DB_USER
const dbname = process.env.DB;

//console.log(`pass: ${pass}\nuser: ${user}\ndbname: ${dbname}`);

//hosting database locally for testing purposes; change this
//once ready for deployments
//const sequelize = new Sequelize(`postgres://${user}:${pass}@localhost:5432/${dbname}`);
const sequelize = new Sequelize(dbname, user, pass, {
    host: 'localhost',
    dialect: 'postgres'
});

//console.log('before async');

(async () => {
    //console.log('in async');
    try {
        await sequelize.authenticate();
        console.log('successfully connected to database!');
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

