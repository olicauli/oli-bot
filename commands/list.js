const { SlashCommandBuilder } = require('@discordjs/builders');
//const { InteractionResponseType } = require('discord-api-types');
const { MessageEmbed, MessageActionRow, MessageButton, IntegrationApplication } = require('discord.js');
const fs = require('fs'); //node file system module
const listFunc = require('../helpers/list-functions.js');

//console.log(process.env);

module.exports = {
    //this whole block is simply building the commands.
    //we have view, rm, add, delete, and create
    //subcommands.
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('view/add/remove stuff on the shopping list (WIP)')
        .addSubcommand(subcommand => 
            subcommand
            .setName('view')
            .setDescription('view a list')
            .addStringOption(option =>
                option.setName('name')
                .setDescription('the name of the list you want to view')
                .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
            .setName('rm')
            .setDescription('remove an item from a list')
            .addStringOption(option =>
                option.setName('id')
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
                option.setName('id')
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
                option.setName('id')
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
        
        //let subCommand = 'view';
        let subCommand = interaction.options.getSubcommand();
        console.log(subCommand);
        //handle subcommands
        if (subCommand === 'view') 
        {
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
        }
        else if (subCommand === 'create')
        {
            console.log('in create');
            listFunc.createList('test');
        }
        else if (subCommand == 'delete')
        {
            //listFunc.deleteList();
        }
        else if (subCommand === 'add')
        {
            listFunc.addItem('test item', 1);
        }
        else if (subCommand === 'rm')
        {
            listFunc.rmItem('test item', 1);
        }
    },
};