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
        
        var numCommands = 0;
        for (const file of commandFiles) {
            numCommands++;
            const commandName = file.split(".")[0];
            commandNames.push(commandName);
            if (numCommands % 4 === 0)
            {
                commandNames.push('\n');
            }
        }
        
        const commands = new MessageEmbed()
            .setColor('#ff99df')
            .setTitle('commands')
            .setDescription(commandNames.join(" "));
        
        await interaction.editReply({ embeds: [commands] });
    },
};