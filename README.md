# hythlodaeus: baby's first discord bot

hythlodaeus is a fun little miscellaneous bot i've made for myself because i wanted an
interactive shopping list in my personal discord server. since he is my first
bot of any kind he is very bare-bones at the moment, and only contains a few 
commands. commands haven't been thoroughly tested yet, but they *should* work
in server and DM channels.

hythlodaeus is written entirely in javascript using discordJS, and currently uses MongoDB 
for his database.

## installation

```
TBA
```

## usage

once hythlodaeus is set up in a discord server, you can interact with 
him through slash (/) commands. this is currently the only way to utilize him,
as he was not written to respond to commands with any other prefix.
all current possible commands are listed below.

### commands: 
`/about` - lists a short introduction about hythlodaeus containing the creator's
         discord tag (to be changed to github username in the future) and the 
         current version that is being run.

`/echo <input>` - replies back with whatever input was passed to it.

`/help` - lists all of the commands currently packaged with hythlodaeus.

`/ping` - replies with pong

`/server` - replies with the server name, id, description, creation date, and total members.
          if DMed this command, hythlodaeus will reply back with an error message.
          
`/shopping-list` - WIP - a command that allows users to view add, remove, or clear items from
                       a shopping list located in a MongoDB database. but because i am a baby
                       i haven't currently integrated the database yet, so this command
                       is almost entirely nonfunctional. will reply telling the user that the 
                       shopping list is empty.

`/user` - replies with the user's nickname (or username if there is none), the user's tag,
        when the user joined the server (if executed in a discord server), and whether
        the user is a bot or not.

## to-do:

the main goals for hythlodaeus's future is to get the shopping-list command up and running,
and maybe add features allowing users to create their own custom lists and reminders. i am
also thinking about adding some music-related commands or a music-based offshoot.

i also want to write some automated tests, because i want to be 100% sure hythlodaeus won't 
randomly crash and also it's just generally good practice.

## contributing

code mostly written by olicauli; a lot of stuff has also been taken from the discordJS docs,
including the event-handler.js code and the command-handler.js code.

if i've taken or modified code from somewhere else, i will try to provide the resources used
in the code file where it is being borrowed.

## license

MIT License

Copyright (c) 2021 olicauli

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