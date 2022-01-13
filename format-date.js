//PLAN:
//1. get data from database
//2. make slash command: todo
//3. three buttons: add, remove, clear
//4. on add: user input field, add input to database, update list
//5. on remove: selection field, pick a number that corresponds to list number, remove that item from the list
//6. on clear: maybe double check, then remove all items from the database

function formatDate(date)
{
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    return `${year}/${month}/${day}`;
}

module.exports = { formatDate };