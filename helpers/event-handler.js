//most of this code is from the DiscordJS guide:
//https://discordjs.guide/creating-your-bot/event-handling.html
const fs = require('fs'); //node file system module

function handleEvent(client)
{
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    
    for (const file of eventFiles) {
        //for some wack ass reason the filepath is different once
        //it's in this function; i don't know javascript or node.js well enough
        //to explain why
    	const event = require(`../events/${file}`);
    	if (event.once) {
    		client.once(event.name, (...args) => event.execute(...args));
    	} 
    	else {
    		client.on(event.name, (...args) => event.execute(...args));
    	}
    }
}

module.exports = { handleEvent };