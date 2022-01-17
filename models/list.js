require('dotenv').config({ path: '../.env' });
const { Sequelize, Model, DataTypes } = require('sequelize');

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
    authorId: 
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    /*
    editors: //future feature: add later
    {
        //array of user ids
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    */
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

(async () => {
    await sequelize.sync();
})();

module.exports = { List };