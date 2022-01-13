function getGuild(interaction)
{
    let output = "a private DM channel";
    if (interaction.inGuild())
    {
        output = '#' + interaction.guild.name;
    }
    
    return output;
}

module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        console.log(`${interaction.user.tag} in ${getGuild(interaction)} triggered an interaction.`);
    }
}