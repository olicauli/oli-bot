# hythlodaeus: baby's first discord bot

hythlodaeus is a fun little miscellaneous bot i've made for myself because i wanted an
interactive shopping list in my personal discord server. since he is my first
bot of any kind he is very bare-bones at the moment, and only contains a few 
commands. commands haven't been thoroughly tested yet, but they *should* work
in server and DM channels.

**frameworks used:**

hythlodaeus is written entirely in javascript using discordJS and node.js. hythlodaeus also uses a postgresql database, and uses sequelize to manage the lists it creates.

## table of contents
- [installation](#installation)
- [usage (commands)](#usage)
   * [general commands](#general)
   * [list commands](#lists)
- [support](#support)
- [to-do list](#to-do-list)
- [contributions](#contributions)
- [license](#license)

## installation

### to get the bot:
[click here to add hythlodaeus to a server!](https://discord.com/api/oauth2/authorize?client_id=930384652714246175&permissions=517544070208&scope=bot%20applications.commands)

### to create your own version of hythlodaeus:

note: this set of instructions won't fully work due to the database not being set up or fully configurable yet.

in order to run the bot, make sure that you have [npm](https://www.npmjs.com/) and [node.js](https://nodejs.org/en/) installed.

1. [follow the discordJS instructions](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
   for setting up a bot application. hythlodaeus needs `bot` and `application.commands` options enabled, as well as `read/send message`,
   `embed link`, and `add reaction` permissions.
2. once the bot application has been set up and the bot is running on your server, create a folder 
   where you want to keep the bot and clone or fork this repo to that folder.
3. open up a terminal of your choice, navigate to the folder and run the command `npm install`
4. to run the bot you will need to set up two environment variables: `TOKEN` and `CLIENT_ID`.
   set `TOKEN` to your bot instance's token and `CLIENT_ID` to your bot instance's client id.
5. hythlodaeus uses a postgresql database, which it accesses using sequelize. make sure you have a database set up, as well as a user that can create/delete/update
tables.
6. set `DATABASE_URL` to your database's URL.
7. once you have set up environment variables, you can run the bot! enter `node app.js` or `node .` in your terminal 
   to launch hythlodaeus.

note: if you want to delete or deploy your own server-specific commands, you will need an additional environment variable:
`GUILD_ID`. simply set this variable to your server's id, and then you can run the guild-specific scripts in the scripts folder.

## usage

once hythlodaeus is set up in a discord server, you can interact with 
him through slash (/) commands. this is currently the only way to utilize him,
as he was not written to respond to commands with any other prefix.
all current possible commands are listed below.

### commands: 

#### general
`/about` - lists a short introduction about hythlodaeus containing the creator's
         discord tag (to be changed to github username in the future) and the 
         current version that is being run.

`/echo <input>` - replies back with whatever input was passed to it.

`/help` - lists all of the commands currently packaged with hythlodaeus.

`/ping` - replies with pong

`/server` - replies with the server name, id, description, creation date, and total members.
          if DMed this command, hythlodaeus will reply back with an error message.

`/user` - replies with the user's nickname (or username if there is none), the user's tag,
        when the user joined the server (if executed in a discord server), and whether
        the user is a bot or not.

#### lists

`list help` - displays information about all list subcommands

`list create <name>` - creates a new list called `<name>`

`list delete <name>` - deletes an existing list called `<name>`

`list view <name>` - displays the contents of a list called `<name>`.

`list all` - displays the names of all the lists currently stored in the database.

`list add <name> <item>` - adds an item called `<item>` to a list called `<name>`.

`list rm <name> <item>` - removes an item called `<item>` from a list called `<name>`

**note:** currently, only the author of a list can modify it.
additionally, duplicate lists (lists with the same name) are not currently allowed.
these are limitations that will hopefully be examined and changed in later builds of hythlodaeus.

### messages:

hythlodaeus will respond or react if certain messages are sent in a channel, thread, or DM. 

`ily hythlodaeus please respond` - hythlodaeus will react with a revolving heart emoji. this is mostly for 
testing purposes and will be removed or changed in future commits.

## support

if you encounter a bug or problem with hythlodaeus, you can [create a new issue](https://github.com/olicauli/oli-bot/issues).

if you would prefer to more privately report the bug, you can email me at <olicauli@pm.me>.

## to-do list

### imminent:
- set up automated tests
- allow multiple people to edit a list; allow users to specify
   if their list is publically editable
- create list clear command
- create buttons that work with lists

### future goals:

- allow users to set reminders
- add more fun little miscellaneous commands
- permissions? maybe?
- utility commands like delete last 100 discord messages
- perhaps. add some music commands

## contributions

code mostly written by olicauli; a lot of stuff has also been taken from the discordJS docs,
including the event-handler.js code and the command-handler.js code.

if i've taken or modified code from somewhere else, i will try to provide the resources used
in the code file where it is being borrowed.

hythlodaeus's avatar is a screenshot from final fantasy 14: endwalker; it will probably change 
in the future.

## license

MIT License

Copyright (c) 2022 olicauli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
