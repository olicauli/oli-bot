const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    //ping
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with pong!'),
    async execute(interaction) {
        await interaction.reply('pong!');
    },
};