const pass = process.env.DB_PASS;
const user = process.env.DB_USER
const dbname = process.env.DB;

const { Sequelize, Op } = require('sequelize');
const usrModel = require('../models/user.js');
const listModel = require('../models/list.js');
const { RequestManager } = require('@discordjs/rest');

//database
const sequelize = new Sequelize(dbname, user, pass, {
    host: 'localhost',
    dialect: 'postgres'
});

//create list
// /list create <name> <editors (optional)> <items (optional)>
async function createList(listName, editors, items)
{
    if (listName == undefined)
    {
        return "error: no list name provided!";
    }

    let editorsArr = [];

    if (editors == undefined) editors = null;
    else 
    {
        //populate editorsArr
    }

    let itemsArr = [];

    if (items == undefined) items = null;
    else 
    {
        //populate itemsArr
    }


    await listModel.List.create({ name: listName, 
                  editors: editorsArr,
                  items: itemsArr });
}
//delete list
async function deleteList(list)
{
    await list.destroy();
}
//add item
function addItem(item)
{
    //list.update(item)
}
//remove item
function rmItem(item)
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

function printListInfo(list) 
{
    let editors = "";
    list.editors.forEach((editor, index) => 
    {
        editors = editors.concat(`\`${editor}\`, `)
    });

    return `list name: ${list.name}
            list id: ${list.id}
            list creator: ${list.authorId}:
            users with list access: ${editors}`;
}

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

function printItems(itemsArr) //not the final form; printList will change to require args and
                     //change output depending on list contents
{
    let output = ""
    if (itemsArr.length > 0)
    {
        itemsArr.forEach((item, index) => {
            output = output.concat(`${index + 1}. ${item}\n`);
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


module.exports = { printItems };