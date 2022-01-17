const { MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
//const fs = require('fs'); //node file system module
const listFunc = require('../helpers/list-functions.js');
const listModel = require('../models/list.js');
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
        //get the options
        let listName = await interaction.options.getString('name', true);
        //get the list
        const list = await listModel.List.findOne({ where: { name: listName } });

        //if the list exists, print it
        if (list)
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
            .setTitle(`${listName} list`)
            .setDescription(listFunc.printList(list));
            await interaction.editReply({ embeds: [listItems], components: [row] });
        }
        else 
        {
            interaction.editReply({ embeds: [feedbackMsgs.errorEmbed()] });
        }
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
        //get the options
        let listName = await interaction.options.getString('list-name', true);
        let item = await interaction.options.getString('item', true);
        //get the list
        const list = await listModel.List.findOne({ where: { name: listName } });

        //add the item
        listFunc.setItem(list, item, 'add');
    }
    else if (subCommand === 'rm')
    {
        //get the options
        let listName = await interaction.options.getString('list-name', true);
        let item = await interaction.options.getString('item', true);
        //get the list
        const list = await listModel.List.findOne({ where: { name: listName } });

        //add the item
        listFunc.setItem(list, item, 'rm');
    }
}

module.exports = { handleLists };