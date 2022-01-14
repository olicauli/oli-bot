//WIP stuff
/*
function createList(lName)
{
    
}

function deleteList(list)
{
    
}

function updateList(list)
{
    
}

function removeItem(list, item)
{
    
}

function clearShoppingList(list)
{
    
    
}

function addItem(list, item)
{

}
*/

function printList() //not the final form; printList will change to require args and
                     //change output depending on list contents
{
    let output = `**there's nothing on your shopping list!**
                  
                  type \`/list add <input>\` to add an item.
                  the buttons should let you clear or delete the list,
                  but you may also use \`/list rm <item-number>\`
                  to delete an item, or \`/list clear\` to clear
                  the list.`
    /*
    if (!list.empty())
    {
        try 
        {
            
        }
        catch (err)
        {
            console.log(err);
        }
    }
    */
    
    return output;
}


module.exports = { printList };