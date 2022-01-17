const { MessageEmbed } = require('discord.js');

function errorEmbed() 
{
    const errorMessage = new MessageEmbed()
    .setColor(global.ERROR_RED)
    .setTitle('error!')
    .setDescription('the command failed to execute!');

    return errorMessage;
}

function successEmbed(commandName)
{
    let desc = "";   
    if (commandName === "list create")
    {
        desc = `your list was successfully created!\nview it by typing \`/list view <list-id>\`.`;
    }
    
    const successMessage = new MessageEmbed()
    .setColor(global.SUCCESS_GREEN)
    .setTitle('success!')
    .setDescription(desc);

    return successMessage;
}

module.exports = { errorEmbed, successEmbed };