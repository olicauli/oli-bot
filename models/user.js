const { Sequelize, DataTypes, Model } = require('sequelize');
require('dotenv').config({ path: '../.env' });

const pass = process.env.DB_PASS;
const user = process.env.DB_USER
const dbname = process.env.DB;

//console.log(`pass: ${pass}\nuser: ${user}\ndbname: ${dbname}`);

//hosting database locally for testing purposes; change this
//once ready for deployments
const sequelize = new Sequelize(dbname, user, pass, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

/*
const User = sequelize.define('User', 
    {
        username: 
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        userid:
        {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);
*/

class User extends Model {}

User.init
({
    //model attributes
    tag: 
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    userid:
    {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    //model options
    sequelize,
    modelName: 'User'
});

(async () => {
    await sequelize.sync({ force: true });
    const oli = await User.create({ userid: "135310222724956160" });
    console.log(oli.toJSON());
    console.log("oli was saved to the database!");
    oli.username = "olicauli";
    await oli.save();
    console.log(oli.toJSON());
    await oli.destroy();
})();


//module.exports = { createTable };