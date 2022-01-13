//webhook test test test test test
//*****REQUIRED*****
const fs = require('fs'); //node file system module
const { Client, Collection, Intents } = require('discord.js');
const mongoose = require('./database/mongoose')
//const { token } = require('./config.json'); //switched to environment variables
const token = process.env.TOKEN;
const commandHandler = require('./helpers/command-handler.js');
const eventHandler = require('./helpers/event-handler.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
eventHandler.handleEvent(client);
commandHandler.handleCommand(client);

mongoose.init();
client.login(token);