const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

//const listArr = require('');

module.exports = {
    //user info
    data: new SlashCommandBuilder()
        .setName('shopping-list')
        .setDescription('view/add/remove stuff on the shopping list (WIP)'),
    async execute(interaction) {
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
            .setColor('#ff99df')
            .setTitle('shopping list')
            .setDescription('placeholder placeholder placeholder placeholder placeholder');
            
        await interaction.reply({ embeds: [listItems], components: [row] });
    },
};