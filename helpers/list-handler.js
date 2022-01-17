const { MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
//const fs = require('fs'); //node file system module
const listFunc = require('../helpers/list-functions.js');
const listModel = require('../models/list.js');
const feedbackMsgs = require('../helpers/command-feedback-msgs.js');

async function handleLists(interaction)
{
    //let subCommand = 'view';
    let subCommand = await interaction.options.getSubcommand();
    console.log(`${interaction.user.tag} executed list subcommand ${subCommand}!`);
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
            console.log('list doesnt exist!');
            interaction.editReply({ embeds: [feedbackMsgs.errorEmbed('list nonexistent')] });
        }
    }
    else if (subCommand === 'create')
    {
        //get options
        let listName = await interaction.options.getString('name', true);
        //check if list already exists
        const list = await listModel.List.findOne({ where: { name: listName } });
        if (!list)
        {
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
        else 
        {
            console.log('list already exists!');
            interaction.editReply({ embeds: [feedbackMsgs.errorEmbed('list exists')] });
        }
        
    }
    else if (subCommand == 'delete')
    {
        //get options
        let listName = await interaction.options.getString('name', true);
        //get list
        const list = await listModel.List.findOne({ where: { name: listName } });

        if (list)
        {
            listFunc.deleteList(list)
            .then(() => 
            {
                interaction.editReply({ embeds: [feedbackMsgs.successEmbed('list delete')] });
            })
            .catch(err =>
                {
                    console.log(err); //log the error, then display the error message
    
                    interaction.editReply({ embeds: [feedbackMsgs.errorEmbed()] });
                });
        }
        else 
        {
            console.log('list doesnt exist!');
            interaction.editReply({ embeds: [feedbackMsgs.errorEmbed('list nonexistent')] });
        }
    }
    //the logic for adding or removing commands is almost identical,
    //so they both get one if statement
    else if (subCommand === 'add' || subCommand === 'rm')
    {
        //get the options
        let listName = await interaction.options.getString('name', true);
        let item = await interaction.options.getString('item', true);
        //get the list
        const list = await listModel.List.findOne({ where: { name: listName } });
        //console.log(list);

        //add item if list exists
        if (list)
        {
            listFunc.setItem(list, item, subCommand)
            .then(() => 
            {
                const msg = 'list '.concat(subCommand);
                //console.log(msg);
                interaction.editReply({ embeds: [feedbackMsgs.successEmbed(msg)] });
            })
            .catch(err =>
            {
                console.log(err); //log the error, then display the error message
    
                interaction.editReply({ embeds: [feedbackMsgs.errorEmbed()] });
            });
        }
        else //if list doesnt exist, throw an error
        {
            console.log('list doesnt exist!');
            interaction.editReply({ embeds: [feedbackMsgs.errorEmbed('list nonexistent')] });
        }
    }
}

module.exports = { handleLists };