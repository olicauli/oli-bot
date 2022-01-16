const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs'); //node file system module
const listFunc = require('../helpers/list-functions.js');

//console.log(process.env);

module.exports = {
    //user info
    data: new SlashCommandBuilder()
        .setName('list')
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
            .setColor(global.HYTHLO_PINK)
            .setTitle('shopping list')
            .setDescription(listFunc.printList());
            
        await interaction.editReply({ embeds: [listItems], components: [row] });
    },
};