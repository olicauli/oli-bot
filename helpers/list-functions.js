require('dotenv').config({ path: '../.env' });
const pass = process.env.DB_PASS;
const user = process.env.DB_USER
const dbname = process.env.DB;

const { Sequelize, Op } = require('sequelize');
const usrModel = require('../models/user.js');
const listModel = require('../models/list.js');
const { RequestManager } = require('@discordjs/rest');
const list = require('../commands/list.js');

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
    console.log('in list-functions create list');
    if (listName == undefined)
    {
        console.log("listname undefined");
        return "error: no list name provided!";
    }

    //editors and items are not currently implemented options,
    //so this code is unused for now
    /*
    let editorsArr = [];

    if (editors == undefined) editors = null;
    else 
    {
        console.log("populate editorsArr");
        //populate editorsArr
    }

    let itemsArr = [];

    if (items == undefined) items = null;
    else 
    {
        console.log("populate itemsArr");
        //populate itemsArr
    }
    */

    try 
    {
        console.log("in try");
        const newList = await listModel.List.create({ name: listName, 
            authorId: author,
            //editors: null, //editors is a future feature
            //items: null //creating with items is a future feature
            });
        console.log(newList.toJSON());
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
async function deleteList(list)
{
    await list.destroy();
}
//add or remove an item
async function setItem(item, listId, option)
{
    let itemsArr = list.items;
    try 
    {
        if (option === 'add') itemsArr.push(item);
        else if (option === 'rm') itemsArr.splice(itemsArr.indexOf(item), 1);
        else 
        {
            console.log(`error: option is unspecified or incorrect!\n
                         option: ${option}`);
            return Promise.reject();
        }
        
        const affectedRows = 
        await listModel.List.update({ items: itemsArr }, 
                                    { where: { id: listId } });
    
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
    catch 
    {
        console.log('error! command failed');
        return Promise.reject(err);
    }
}
//remove item
/*
async function rmItem(item, listId)
{
    let itemsArr = list.items;
    try 
    {
        itemsArr.splice(itemsArr.indexOf(item), 1);
        const affectedRows = 
        await listModel.List.update({ items: itemsArr }, 
                                    { where: { id: listId } });
    
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
    catch 
    {
        console.log('error! command failed');
        return Promise.reject(err);
    }
    
}
*/
/*
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
*/

function printListInfo(list) 
{
    //let editors = "";
    //UNFINISHED: come back and edit this to search
    //through the guild's member list for user tags
    //for author and all editors
    /*
    list.editors.forEach((editor, index) => 
    {
        editors = editors.concat(`\`${editor}\`, `)
    });
    */

    return `list name: ${list.name}
            list id: ${list.id}
            list creator: ${list.authorId}`;
}

/*
//user is a discordjs User class
//https://discord.js.org/#/docs/discord.js/stable/class/User
function printAllLists(user)
{
    //find all lists user is an author of
    listModel.Lists.findAll({
        where: 
        {
            authorId: user.id
        }
    })

    //print the lists' names, 
}
*/

function printItems(itemsArr) //not the final form; printList will change to require args and
                     //change output depending on list contents
{
    let output = ""
    if (itemsArr.length > 0)
    {
        itemsArr.forEach((item, index) => {
            output = output.concat(`**${index + 1}**. ${item}\n`);
        })
    }
    else 
    {
        output = `**there's nothing on your list!**
                  
        type \`/list add <input>\` to add an item.
        the buttons should let you clear or delete the list,
        but you may also use \`/list rm <item-number>\`
        to delete an item, or \`/list clear\` to clear
        the list.`;
    }
    
    return output;
}


module.exports = { printItems, createList, setItem, deleteList };