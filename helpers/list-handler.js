const { MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
//const fs = require('fs'); //node file system module
const listFunc = require('../helpers/list-functions.js');
const feedbackMsgs = require('../helpers/command-feedback-msgs.js');

async function handleLists(interaction)
{
    //let subCommand = 'view';
    console.log(interaction.options);
    let subCommand = await interaction.options.getSubcommand();
    console.log(`subCommand: ${subCommand}`);
    //handle subcommands
    if (subCommand === 'view') 
    {
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

        const listItems = new MessageEmbed()
        .setColor(global.HYTHLO_PINK)
        .setTitle('shopping list')
        .setDescription(listFunc.printItems(["eggs", "milk", "bread"]));
        await interaction.editReply({ embeds: [listItems], components: [row] });
    }
    else if (subCommand === 'create')
    {
        console.log('in create');
        let listName = await interaction.options.getString('name', true);
        let userId = await interaction.user.id;
        listFunc.createList(listName, userId)
        .then(() =>
        {
            interaction.editReply({ embeds: [feedbackMsgs.successEmbed('list create')] });
            //console.log("in then");
        })
        .catch(err =>
            {
                //console.log('in catch');
                console.log(err); //log the error, then display the error message

                interaction.editReply({ embeds: [feedbackMsgs.errorEmbed()] });
            });
    }
    else if (subCommand == 'delete')
    {
        //listFunc.deleteList();
    }
    else if (subCommand === 'add')
    {
        listFunc.setItem('test item', 1, 'add');
    }
    else if (subCommand === 'rm')
    {
        listFunc.setItem('test item', 1, 'rm');
    }
}

module.exports = { handleLists };