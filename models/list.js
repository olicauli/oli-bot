/*
const { Sequelize, DataTypes } = require('sequelize');
const { User } = require('user.js');

const pass = process.env.DB_PASS;
const user = process.env.DB_USER
const dbname = process.env.DB;

const sequelize = new Sequelize(dbname, user, pass, {
    host: 'localhost',
    dialect: 'postgres'
});

class List extends Model {}

List.init
({
    name:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: 
    {
        //type: User,
        allowNull: false
    },
    editors:
    {
        //array of Users
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    items:
    {
        type: DataTypes.ARRAY(DataTypes.STRING)
    }
}, 
{
    //model options
    sequelize,
    modelName: 'List'
});
*/