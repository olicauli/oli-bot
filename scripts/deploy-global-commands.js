//script taken from the discordJS guide:
//https://discordjs.guide/creating-your-bot/creating-commands.html#command-deployment-script
require('dotenv').config({ path: '../.env' });
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

const commands = [];
const commandFiles = fs.readdirSync('../commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);


//note: global commands don't update instantly; they are cached for one hour
//for dev purposes, making a guild command is better, since they get updated instantly.
(async () => {
	try {
		console.log('started refreshing application (/) commands.');

		await rest.put(
        	Routes.applicationCommands(clientId),
        	{ body: commands },
        );

		console.log('successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
