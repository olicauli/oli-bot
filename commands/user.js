const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    //user info
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('replies with user info'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#ff99df')
            .setThumbnail(interaction.user.avatarURL())
            .setTitle( `${interaction.user.username}'s info`)
            .setDescription(`your nickname: ${interaction.member.nickname}\nyour tag: ${interaction.user.tag}
                            your id: ${interaction.user.id}
                            joined this server on: ${interaction.member.joinedAt}
                            is a bot? ${interaction.user.bot}`);
        await interaction.reply({ embeds: [embed] });
    },
};