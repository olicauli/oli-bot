//*****REQUIRED*****
require('dotenv').config();
const fs = require('fs'); //node file system module
const { Client, Collection, Intents } = require('discord.js');

//environmental variables
console.log(token);

//import handlers
const commandHandler = require('./helpers/command-handler.js');
const eventHandler = require('./helpers/event-handler.js');

//global variables
//the previous pink: #ff99df
global.HYTHLO_PINK = "#cfb3ee" //the default color used in embeds

//code that runs the bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], 
                            partials: ["CHANNEL"] }); //this partial allows it to check messages in dms
//handlers
eventHandler.handleEvent(client);
commandHandler.handleCommand(client);

client.login(token);