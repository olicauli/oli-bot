const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs'); //node file system module

//using a json file for now--may try and switch
//to mongodb later to gain some experience using
//a database
//read the shopping-list
//let listFile = '../database/shopping-list.json'
//let list = fs.readFileSync(listFile)

function updateShoppingList()
{
    
}

function printShoppingList()
{
    let output = `**there's nothing on your shopping list!**
                  
                  type \`/shopping-list add <input>\` to add an item.
                  the buttons should let you clear or delete the list,
                  but you may also use \`/shopping-list rm <item-number>\`
                  to delete an item, or \`/shopping-list clear\` to clear
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

function addItem(list, input)
{
    /*
    const item = {
        (list.length + 1): input;
    }
    
    const itemJsonFormat = JSON.stringify(item, null, 4);
    fs.appendFileSync(listFile, itemJsonFormat);
    */
}

function removeItem()
{
    
}

function clearShoppingList(list)
{
    
    
}

module.exports = {
    //user info
    data: new SlashCommandBuilder()
        .setName('shopping-list')
        .setDescription('view/add/remove stuff on the shopping list (WIP)'),
    async execute(interaction) {
        await interaction.deferReply();
        const row = new MessageActionRow()
            .addComponents
            (
                /*
                new MessageButton()
                .setCustomId('add')
                .setLabel('add item')
                .setStyle('SUCCESS'),
                */
                
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
            .setColor('#ff99df')
            .setTitle('shopping list')
            .setDescription(printShoppingList());
            
        await interaction.editReply({ embeds: [listItems], components: [row] });
    },
};