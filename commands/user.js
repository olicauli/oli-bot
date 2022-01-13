const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fDate = require('../helpers/format-date.js')

function isABot(userIsBot)
{
    return userIsBot?"yes":"no";
}

function nick(interaction)
{
    return interaction.member.nickname?
           interaction.member.nickname:
           interaction.user.username;
}

function printEmbedDesc(interaction)
{
    return `**your nickname:** ${nick(interaction)}
            **your tag:** ${interaction.user.tag}
            **your id:** ${interaction.user.id}
            **joined this server on:** ${fDate.formatDate(interaction.member.joinedAt)}
            **is a bot?** ${isABot(interaction.user.bot)}`
}

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
            .setDescription(printEmbedDesc(interaction));
        await interaction.reply({ embeds: [embed] });
    },
};