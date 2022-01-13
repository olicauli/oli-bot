//*****REQUIRED*****
require('dotenv').config();
const fs = require('fs'); //node file system module
const { Client, Collection, Intents } = require('discord.js');
const mongoose = require('./database/mongoose')

//environmental variables
const token = process.env.TOKEN;

//import handlers
const commandHandler = require('./helpers/command-handler.js');
const eventHandler = require('./helpers/event-handler.js');

//global variables
global.HYTHLO_PINK = "#ff99df" //the default pink color used in embeds

//code that runs the bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
eventHandler.handleEvent(client);
commandHandler.handleCommand(client);

mongoose.init();
client.login(token);