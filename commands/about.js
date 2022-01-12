const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('../package.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('replies information about hythlodaeus'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#ff99df')
            .setThumbnail(interaction.client.user.avatarURL())
            .setTitle('who am i?')
            .setDescription(`my name is hythlodaeus!\ni'm a robot created by SuperiorTea#0517.
                            type /help to see all of my current commands!\n\ncurrent version: ${version}`);
        await interaction.reply({ embeds: [embed] });
    },
};