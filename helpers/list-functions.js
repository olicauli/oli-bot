require('dotenv').config({ path: '../.env' });
const { MessageEmbed } = require('discord.js');
const pass = process.env.DB_PASS;
const user = process.env.DB_USER
const dbname = process.env.DB;

const { Sequelize } = require('sequelize');
const listModel = require('../models/list.js');

//database
const sequelize = new Sequelize(dbname, user, pass, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

//create list
// /list create <list name>
async function createList(listName, author)
{
    //console.log('in list-functions create list');
    if (listName == undefined)
    {
        console.log("listname undefined");
        return "error: no list name provided!";
    }

    try 
    {
        //console.log("in try");
        await listModel.List.create({ name: listName, 
            authorId: author });
        console.log(`created list ${listName}!`);
        return Promise.resolve();
    }
    catch (err)
    {
        if (err.name === 'SequelizeUniqueConstraintError') 
        {
            console.log('error! list already exists')
            return Promise.reject(err); //async functions return promises; returns
                                        //a promise telling the caller that it was rejected
        }
        
        console.log(err.name);
        console.log('error! command failed');
        return Promise.reject(err);
    }
}

//delete list
async function deleteList(listName)
{
    try 
    {
        await listModel.List.destroy( 
            { where: { name: listName } });
        console.log(`deleted list ${listName}!`);
        return Promise.resolve();
    }
    catch (err)
    {
        console.log('error! command failed');
        return Promise.reject(err);
    }
}

//add or remove an item
async function setItem(list, item, option)
{
    if (list.items === null)
    {
        itemsArr = [];
    }
    else 
    {
        itemsArr = list.items;
    }
    try 
    {
        //add or remove the item
        if (option === 'add') itemsArr.push(item);
        else if (option === 'rm') itemsArr.splice(itemsArr.indexOf(item), 1);
        //output an error if option is invalid
        else 
        {
            console.log(`error: option is unspecified or incorrect!\n
                         option: ${option}`);
            return Promise.reject();
        }
        
        //update the instance in the database
        const affectedRows = 
        await listModel.List.update({ items: itemsArr }, 
                                    { where: { name: list.name } });
    
        if (affectedRows > 0)
        {
            console.log("the list was updated!");
            return Promise.resolve();
        }
        else 
        {
            console.log("couldn't find the list");
            return Promise.reject();
        }
    }
    catch (err)
    {
        console.log('error! command failed');
        console.log(err)
        return Promise.reject(err);
    }
}

function getListInfo(list) 
{
    return `list name: ${list.name}
            list id: ${list.id}`;
}

function getAllListsEmbed(lists)
{
    const embed = new MessageEmbed()
            .setColor(global.HYTHLO_PINK)
            .setTitle(`all lists in the database:`)
            .setDescription(lists);

    return embed;
}

function getListViewEmbed(list) //not the final form; printList will change to require args and
                     //change output depending on list contents
{
    //a button row; currently unused, as we currently don't have
            //a button handler.
            /*
            const row = new MessageActionRow()
            .addComponents
            (
                
                new MessageButton()
                .setCustomId('add')
                .setLabel('add item')
                .setStyle('SUCCESS'),
                
                new MessageButton()
                .setCustomId('remove')
                .setLabel('remove item')
                .setStyle('DANGER'),
                
                new MessageButton()
                .setCustomId('clear')
                .setLabel('clear shopping list')
                .setStyle('SECONDARY'),
            );
            */
    
    let desc = ""
    if (list.items != null && list.items.length > 0)
    {
        list.items.forEach((item, index) => {
            desc = desc.concat(`**${index + 1}**. ${item}\n`);
        })
    }
    else 
    {
        desc = `**there's nothing on your list!**
                  
        type \`/list add <item>\` to add an item.
        or \`/list rm <item>\` to delete an item.
        after you update your list, type 
        \`/list view <name>\` to view your updated list!`;
    }

    const listEmbed = new MessageEmbed()
    .setColor(global.HYTHLO_PINK)
    .setTitle(`your ${list.name} list`)
    .setDescription(desc)
    .addField( 'other list info',  getListInfo(list) );

    return listEmbed;
}

function getHelpEmbed()
{
    desc = `**commands**
            \`/list create <name>\` creates a new list called \`<name>\`.
            *note: all list names must be unique; you cannot have two lists with the same name.*\n
            \`/list delete <name>\` deletes a list called \`<name>\`.\n
            \`/list all\` displays the names of all the lists currently stored in the database.\n
            \`/list add <name> <item>\` adds an item called \`<item>\` to a list called \`<name>\`.
            *note: the list you name must exist first in order for the item to be added.*\n
            \`/list rm <name> <item>\` removes an item called \`<item>\` from a list called \`<name>\`
            *note: the list you name must exist first in order for the item to be removed.*\n
            
            **other notes**
            in the current build of hythlodaeus, you must be the author of the list in order
            to edit it. however, in the future, olicauli will hopefully add the ability to
            specify who can and can't edit a list. 
            
            also, being able to create duplicate lists provided they are made by different authors 
            is a feature oli is also hoping to add eventually.
            
            **i hope you enjoy the functional parts of list for now!**`;

    const helpEmbed = new MessageEmbed()
            .setColor(global.HYTHLO_PINK)
            .setTitle(`how to use \`/list\`!`)
            .setDescription(desc);
    return helpEmbed;
}


module.exports = { getListViewEmbed, getAllListsEmbed, createList, setItem, deleteList, getHelpEmbed };