const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs'); //node file system module
const listFunc = require('../helpers/list-functions.js');

//console.log(process.env);

module.exports = {
    //user info
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('view/add/remove stuff on the shopping list (WIP)')
        
        .addSubcommand(subcommand => 
            subcommand
            .setName('rm')
            .setDescription('remove an item from a list')
            .addStringOption(option =>
                option.setName('listid')
                .setDescription('the id of the list you want to change')
                .setRequired(true))
            .addStringOption(option =>
                option.setName('items')
                .setDescription('the item you want to remove')
                .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
            .setName('add')
            .setDescription('add an item to a list')
            .addStringOption(option =>
                option.setName('listid')
                .setDescription('the id of the list you want to change')
                .setRequired(true))
            .addStringOption(option =>
                option.setName('items')
                .setDescription('the item you want to add')
                .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
            .setName('delete')
            .setDescription('delete a list that you own')
            .addStringOption(option =>
                option.setName('listid')
                .setDescription('the id of the list you want to change')
                .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
            .setName('create')
            .setDescription('create a new list')
            .addStringOption(option =>
                option.setName('name')
                .setDescription('the name of the list you want to change')
                .setRequired(true))),
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
            .setDescription(listFunc.printItems(["eggs", "milk", "bread"]));
            
        await interaction.editReply({ embeds: [listItems], components: [row] });
    },
};