const { MessageEmbed } = require('discord.js');

async function executeIfInGuild(interaction, func)
{
    if (!interaction.inGuild())
    {
        const embed = new MessageEmbed()
        .setColor('#ff99df')
        .setTitle(`this is a server specific command!`)
        .setDescription(`try this command again when you are in a server.`);
        await interaction.reply({ embeds: [embed] });
    }
    
    else {
        func(interaction);
    }
}

module.exports = { executeIfInGuild };