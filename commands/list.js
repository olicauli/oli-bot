const { SlashCommandBuilder } = require('@discordjs/builders');
//const { InteractionResponseType } = require('discord-api-types');
const { MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const fs = require('fs'); //node file system module
const listHandler = require('../helpers/list-handler.js');

function displayErrorEmbed() 
{
    const errorMessage = new MessageEmbed()
    .setColor(global.ERROR_RED)
    .setTitle('error!')
    .setDescription('the command failed to execute!');

    return errorMessage;
}

module.exports = {
    //this whole block is simply building the commands.
    //we have view, rm, add, delete, and create
    //subcommands.
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('view/add/remove stuff on the shopping list (WIP)')
        .addSubcommand(subcommand => 
            subcommand
            .setName('help')
            .setDescription('get information on how to use /list'))
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
                option.setName('name')
                .setDescription('the name of the list you want to change')
                .setRequired(true))
            .addStringOption(option =>
                option.setName('item')
                .setDescription('the item you want to remove')
                .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
            .setName('add')
            .setDescription('add an item to a list')
            .addStringOption(option =>
                option.setName('name')
                .setDescription('the name of the list you want to change')
                .setRequired(true))
            .addStringOption(option =>
                option.setName('item')
                .setDescription('the item you want to add')
                .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
            .setName('delete')
            .setDescription('delete a list that you own')
            .addStringOption(option =>
                option.setName('name')
                .setDescription('the name of the list you want to delete')
                .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
            .setName('create')
            .setDescription('create a new list')
            .addStringOption(option =>
                option.setName('name')
                .setDescription('the name of the list you want to create')
                .setRequired(true))),
    async execute(interaction) {
        await interaction.deferReply();
        
        //handleLists checks what subcommand has been used, and executes
        //list functions/handles errors depending on the input.
        listHandler.handleLists(interaction);
    },
};