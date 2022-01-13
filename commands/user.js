const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fDate = require('../helpers/format-date.js')

function isABot(userIsBot)
{
    return userIsBot?"yes":"no";
}

function nick(interaction)
{
    return interaction.inGuild() && interaction.member.nickname?
           `**your nickname:** ${interaction.member.nickname}`:
           `**your username:** ${interaction.user.username}`;
}

function guildSpecificInfo(interaction)
{
    return interaction.inGuild()?
           `**joined this server on:** ${fDate.formatDate(interaction.member.joinedAt)}`:
           '';
}

function printEmbedDesc(interaction)
{
    return `${nick(interaction)}
            **your tag:** ${interaction.user.tag}
            **your id:** ${interaction.user.id}
            **is a bot?** ${isABot(interaction.user.bot)}
            ${guildSpecificInfo(interaction)}`;
}

module.exports = {
    //user info
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('replies with user info'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor(global.HYTHLO_PINK)
            .setThumbnail(interaction.user.avatarURL())
            .setTitle( `${interaction.user.username}'s info`)
            .setDescription(printEmbedDesc(interaction));
        await interaction.reply({ embeds: [embed] });
    },
};