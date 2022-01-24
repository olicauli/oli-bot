const { MessageEmbed } = require('discord.js');

//checks if an interaction happened in a guild; if it is,
//runs the provided function. if not, sends an embed telling
//users to run the command in a server
async function executeIfInGuild(interaction, func, funcArgs)
{
    if (!interaction.inGuild())
    {
        const embed = new MessageEmbed()
        .setColor('#ff99df')
        .setTitle(`this is a server specific command!`)
        .setDescription(`try this command again when you are in a server.`);
        await interaction.editReply({ embeds: [embed] });
    }
    
    else {
        func(funcArgs);
    }
}

module.exports = { executeIfInGuild };