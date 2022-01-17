require('dotenv').config({ path: '../.env' });
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
    console.log('in list-functions create list');
    if (listName == undefined)
    {
        console.log("listname undefined");
        return "error: no list name provided!";
    }

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
    try 
    {
        await listModel.List.destroy( 
            { where: { name: list.name } });
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

function printList(list) //not the final form; printList will change to require args and
                     //change output depending on list contents
{
    //get the list items
    const itemsArr = list.items;

    let output = ""
    if (itemsArr != null && itemsArr.length > 0)
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


module.exports = { printList, createList, setItem, deleteList };