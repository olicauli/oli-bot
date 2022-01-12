module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        if (interaction.guild === null) {
            interaction.reply("error: commands don't work in dms!\nplease try again in a server.");
            return;
        };
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
    }
}