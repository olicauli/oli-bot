const pass = process.env.DB_PASS;
const user = process.env.DB_USER
const dbname = process.env.DB;

const { Sequelize } = require('sequelize');
const usrModel = require('../models/user.js');
const list = require('../models/list.js');

//database
const sequelize = new Sequelize(dbname, user, pass, {
    host: 'localhost',
    dialect: 'postgres'
});

function printLists(user)
{
    //print out all lists user is an author or editor of
}

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