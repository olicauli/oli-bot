//most of this code is from the DiscordJS guide:
//https://discordjs.guide/creating-your-bot/command-handling.html
const { Client, Collection } = require('discord.js');
const fs = require('fs'); //node file system module

function readCommands(client)
{
    client.commands = new Collection();
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        //for some wack ass reason the filepath is different once
        //it's in this function; i don't know javascript or node.js well enough
        //to explain why
        const command = require(`../commands/${file}`);
        //set a new item in the collection with the key 
        //as the command name and the value as the exported module
        client.commands.set(command.data.name, command);
    }
}

function handleCommand(client)
{
    readCommands(client);
    
    client.on('interactionCreate', async interaction => {
        //if it's not a command, return immediately
        /*
        if (!interaction.inGuild()) {
            await interaction.deferReply();
            try {
                await interaction.editReply("commands don't work in dms!\nplease try again in a server.");
            }
            catch(err) {
                console.log(err);
            }
            return;
        };
        */
            
        if (!interaction.isCommand()) return;
        
        const command = client.commands.get(interaction.commandName);
        
        //if commands collection is empty, return
        if (!command) 
        {
            return;
        }
        
        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
        
    })
}

module.exports = { handleCommand };