const fs = require ('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

function getFormattedCmds()
{
    //get a formatted array of command names
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    var formattedCmds = [];
    var numCommands = 0;
        for (const file of commandFiles) {
            numCommands++;
            const commandName = file.split(".")[0];
            formattedCmds.push(commandName);
            if (numCommands % 4 === 0)
            {
                formattedCmds.push('\n');
            }
        }
    //return the array as a string
    return '\`' + formattedCmds.join(" ") + '\`'
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('replies with a list of commands'),
    async execute(interaction) {
        await interaction.deferReply();
        
        const commands = new MessageEmbed()
            .setColor(global.HYTHLO_PINK)
            .setTitle('current commands')
            .setDescription(getFormattedCmds());
        
        await interaction.editReply({ embeds: [commands] });
    },
};