const fs = require ('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('replies with a list of commands'),
    async execute(interaction) {
        await interaction.deferReply();
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        var commandNames = [];
        
        for (const file of commandFiles) {
            const commandName = file.split(".")[0];
            commandNames.push(commandName);
        }
        
        const commands = new MessageEmbed()
            .setColor('#ff99df')
            .setTitle('commands')
            .setDescription(commandNames.join(" "));
        
        await interaction.editReply( {content: 'here are the current commands included with hythlodaeus:',
        embeds: [commands]} );
    },
};