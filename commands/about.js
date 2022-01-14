const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('../package.json');
const { MessageEmbed } = require('discord.js');

function printEmbedDesc() 
{
    return `my name is hythlodaeus!
            i'm a robot created by [olicauli](https://github.com/olicauli).
            type \`/help\` to see all of my current commands!
            
            current version: ${version}`
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('replies with information about hythlodaeus'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor(global.HYTHLO_PINK)
            .setThumbnail(interaction.client.user.avatarURL())
            .setTitle('who am i?')
            .setDescription(printEmbedDesc());
        await interaction.reply({ embeds: [embed] });
    },
};