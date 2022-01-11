//webhook test test
//*****REQUIRED*****
const fs = require('fs'); //node file system module
const { Client, Collection, Intents } = require('discord.js');
const mongoose = require('./database/mongoose')
//const { token } = require('./config.json');
const token = process.env.TOKEN;

//*****CLIENT*****
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//*****EVENT HANDLERT*****
//make a collection called events, and then read all files in ./events, 
//but only filter in files that end in .js
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} 
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//*****COMMAND HANDLER*****
//make a collection called commands, and then read all files in ./commands, 
//but only filter in files that end in .js
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    //set a new item in the collection with the key 
    //as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    //if it's not a command, return immediately
    if (interaction.channel.type == 'dm') return;
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

mongoose.init();
client.login(token);