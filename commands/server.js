const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const dateFuncs = require('../helpers/format-date.js')
const guildGuard = require('../helpers/guild-guard.js')

async function serverInfoEmbed(interaction)
{
    const embed = new MessageEmbed()
    .setColor(global.HYTHLO_PINK)
    .setThumbnail(interaction.guild.iconURL())
    .setTitle(`${interaction.guild.name}'s info`)
    .setDescription(printServerInfo(interaction));
    await interaction.reply({ embeds: [embed] });
}

function printServerInfo(interaction)
{
    return `**server name:** ${interaction.guild.name}
            **server id:** ${interaction.guildId}
            **description:** ${gDescription(interaction.description)}
            **created on:** ${dateFuncs.formatDate(interaction.guild.createdAt)}
            **total members:** ${interaction.guild.memberCount}`
}

function gDescription(desc) {
    return desc? desc: "(no description found)";
}

module.exports = {
    //server info
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('replies with server info'),
    async execute(interaction) {
        guildGuard.executeIfInGuild(interaction, serverInfoEmbed, interaction);
    },
};