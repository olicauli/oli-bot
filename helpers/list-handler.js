const listFunc = require('../helpers/list-functions.js');
const listModel = require('../models/list.js');
const feedbackMsgs = require('../helpers/command-feedback-msgs.js');

function hasPerms(user, authorOfList)
{
    return authorOfList == user;
}

async function handleLists(interaction)
{
    //let subCommand = 'view';
    let subCommand = await interaction.options.getSubcommand();
    console.log(`${interaction.user.tag} executed list subcommand ${subCommand}!`);
    //handle subcommands
    if (subCommand === 'help')
    {
        helpEmbed = listFunc.getHelpEmbed();
        await interaction.editReply({ embeds: [helpEmbed] });

    }
    else if (subCommand === 'view') 
    {
        //get the options
        let listName = await interaction.options.getString('name', true);
        //get the list
        const list = await listModel.List.findOne({ where: { name: listName, guildId: interaction.guildId } });

        //if the list exists, print it
        if (list)
        {    
            let listEmbed = listFunc.getListViewEmbed(list)
            await interaction.editReply({ embeds: [listEmbed] });
        }
        else 
        {
            console.log('list doesnt exist!');
            interaction.editReply({ embeds: [feedbackMsgs.errorEmbed('list nonexistent')] });
        }
    }
    else if (subCommand === 'all')
    {
        const listNames = await listModel.List.findAll({ where: { guildId: interaction.guildId } });
        const listString = listNames.map(list => list.name).join(', ') 
        || `there are no lists in the database!
            create a list with \`/list create <name>\`.`;

        listAllEmbed = listFunc.getAllListsEmbed(listString);
        interaction.editReply({ embeds: [listAllEmbed] });
    }
    else if (subCommand === 'create')
    {
        //get options
        let listName = await interaction.options.getString('name', true);
        //check if list already exists
        const list = await listModel.List.findOne({ where: { name: listName, guildId: interaction.guildId } });

        if (!list)
        {
            let userId = await interaction.user.id;
            listFunc.createList(listName, userId, interaction.guildId)
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
        const list = await listModel.List.findOne({ where: { name: listName, guildId: interaction.guildId } });

        if (list)
        {
            if (!(hasPerms(interaction.guildId, list.guildId)))
            {
                console.log("error! insufficient edit permissions");
                interaction.editReply({ embeds: [feedbackMsgs.errorEmbed('edit disallowed')] });
                return;
            }

            listFunc.deleteList(listName, interaction.guildId)
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
        const list = await listModel.List.findOne({ where: { name: listName, guildId: interaction.guildId } });

        //add item if list exists
        if (list)
        {
            if (!(hasPerms(interaction.user.id, list.authorId)))
            {
                console.log("error! insufficient edit permissions");
                interaction.editReply({ embeds: [feedbackMsgs.errorEmbed('edit disallowed')] });
                return;
            }

            listFunc.setItem(list, item, subCommand, interaction.guildId)
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