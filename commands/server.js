const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    //server info
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('replies with server info'),
    async execute(interaction) {
        await interaction.reply(`server name: ${interaction.guild.name}\ntotal members: ${interaction.guild.memberCount}`);
    },
};