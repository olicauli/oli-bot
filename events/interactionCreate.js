function getGuild(interaction)
{
    return interaction.inGuild()?
    '#' + interaction.guild.name:
    "a private DM channel";
}

module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        console.log(`${interaction.user.tag} in ${getGuild(interaction)} triggered an interaction.`);
    }
};