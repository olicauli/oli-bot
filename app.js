//*****REQUIRED*****
require('dotenv').config();
const fs = require('fs'); //node file system module
const { Client, Collection, Intents } = require('discord.js');
const token = process.env.TOKEN;

//environmental variables
//console.log(token);

//import handlers
const commandHandler = require('./helpers/command-handler.js');
const eventHandler = require('./helpers/event-handler.js');

//global variables
//the previous pink: #ff99df
global.HYTHLO_PINK = "#cfb3ee" //the default color used in embeds
global.ERROR_RED = "#A52A2A" //the color used for error messages in embeds
global.SUCCESS_GREEN = "#8FBC8F"; //the color used when a command is successfully executed

//code that runs the bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], 
                            partials: ["CHANNEL"] }); //this partial allows it to check messages in dms
//handlers
eventHandler.handleEvent(client);
commandHandler.handleCommand(client);

client.login(token);