const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('replies information about hythlodaeus'),
    async execute(interaction) {
        await interaction.reply(`hello! i am a robot created by oli, mostly to manage a to-do list.
        \nlibrary used: discord.js\ncurrent version: ${version}`);
    },
};