const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs'); //node file system module
const listFunc = require('../helpers/list-functions.js');
const { Sequelize } = require('sequelize');
const usrModel = require('../models/user.js');
const list = require('../models/list.js');

//console.log(process.env);

const pass = process.env.DB_PASS;
const user = process.env.DB_USER
const dbname = process.env.DB;

//database
const sequelize = new Sequelize(dbname, user, pass, {
    host: 'localhost',
    dialect: 'postgres'
});

//create list
function createList(listName)
{
    //list.create({ name: listName })
}
//delete list
function deleteList(list)
{
    //list.delete();
}
//add item
function addItem(item)
{
    //list.update(item)
}
//remove item
function rmItem()
{
    //list.update(item)
}
//clear list
function clearList(list)
{
    //iterate through list items, delete them all
}
//add editor
function addEditor(user)
{
    //get user's tag
    //get user's userid
    //make user instance
    //add user instance to user array in list
}
//remove editor
function rmEditor(user, rmAll)
{
    //if !rmAll
        //get user's tag
        //get user's id
        //make user instance
        //if (user in list)
        //  delete user
        //else
        //  "user was not found."
    //else
        //iterate through editors in list and remove them
}



module.exports = {
    //user info
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('view/add/remove stuff on the shopping list (WIP)'),
    async execute(interaction) {
        await interaction.deferReply();
        const row = new MessageActionRow()
            .addComponents
            (
                /*
                new MessageButton()
                .setCustomId('add')
                .setLabel('add item')
                .setStyle('SUCCESS'),
                */
                
                new MessageButton()
                .setCustomId('remove')
                .setLabel('remove item')
                .setStyle('DANGER'),
                
                new MessageButton()
                .setCustomId('clear')
                .setLabel('clear shopping list')
                .setStyle('SECONDARY'),
            );
            
        const listItems = new MessageEmbed()
            .setColor(global.HYTHLO_PINK)
            .setTitle('shopping list')
            .setDescription(listFunc.printList());
            
        await interaction.editReply({ embeds: [listItems], components: [row] });
    },
};