const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    //server info
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('replies with server info'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#ff99df')
            .setThumbnail(interaction.guild.iconURL())
            .setTitle(`${interaction.guild.name}'s info`)
            .setDescription(`server name: ${interaction.guild.name}\nserver id: ${interaction.guild.guildID}
                            description: ${interaction.guild.description}\ncreated on: ${interaction.guild.createdAt}
                            total members: ${interaction.guild.memberCount}`);
        await interaction.reply({ embeds: [embed] });
    },
};