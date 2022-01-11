const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('replies with your input!')
        .addStringOption(option =>
            option.setName('input')
            .setDescription('the input to echo back')
            .setRequired(true)),
    async execute(interaction) {
        const input = interaction.options.getString('input');
        await interaction.reply(input);
    },
};