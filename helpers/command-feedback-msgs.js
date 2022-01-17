const { MessageEmbed } = require('discord.js');

//GENERAL ERROR MESSAGE
function errorEmbed(err) 
{
    console.log('in errorembed');
    console.log(err);
    let desc = '';
    if (err === 'list nonexistent')
    {
        desc = "the list you tried to access doesn't exist!";
        console.log(`desc: ${desc}`);
    }
    else if (err === 'list exists') //for creating lists
    {
        desc = "a list with that name already exists!\nplease try again with a unique list name.";
    }
    else //default error message
    {
        desc = "the command failed to execute!";
    }
    const errorMessage = new MessageEmbed()
    .setColor(global.ERROR_RED)
    .setTitle('error!')
    .setDescription(desc);

    return errorMessage;
}

//success messages for various commands
function successEmbed(commandName)
{
    let desc = "";   
    if (commandName === "list create")
    {
        desc = `your list was successfully created!\nview it by typing \`/list view <name>\`.`;
    }
    else if (commandName === 'list add' || commandName === 'list rm')
    {
        const modified = (commandName === 'list add')?'added':'removed';

        desc = `your item was successfully ${modified} to the list!
                view it by typing \`/list view <name>\`.`;
    }
    
    const successMessage = new MessageEmbed()
    .setColor(global.SUCCESS_GREEN)
    .setTitle('success!')
    .setDescription(desc);

    return successMessage;
}

module.exports = { errorEmbed, successEmbed };