module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        //console.log(interaction.channel);
        if (!interaction.guild) {
            interaction.reply("commands don't work in dms!\nplease try again in a server.");
            return;
        };
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
    }
}