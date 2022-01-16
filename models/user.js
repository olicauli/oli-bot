const { Sequelize, DataTypes, Model } = require('sequelize');
require('dotenv').config({ path: '../.env' });

function createTable(sequelize) 
{
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
    });
}

//get this working so i can add instance level methods
/*
const sequelize = new Sequelize(dbname, user, pass, {
    host: 'localhost',
    dialect: 'postgres'
});
*/
/*
class User extends Model {}

User.init
({
    //model attributes
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
},
{
    //model options
    sequelize,
    modelName: 'User'
});
*/


module.exports = { createTable };