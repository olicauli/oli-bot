const { SlashCommandBuilder } = require('@discordjs/builders');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Todo = sequelize.define('todolist', {
   id: {
       type: Sequelize.STRING,
       unique: true,
   },
   
   itemdesc: {
       type: Sequelize.TEXT,
       defaultValue: "",
   }
});

module.exports = {
    //user info
    data: new SlashCommandBuilder()
        .setName('todo')
        .setDescription('view or edit the todo list!')
        .addStringOption(option => {
            option.setName('add')
            .setDescription('add an item')
        })
        .addStringOption(option => {
            option.setName('del')
            .setDescription('remove an item')
        })
        .addStringOption(option => {
            option.setName('view')
            .setDescription('view the list!')
        })
        .addStringOption(option => {
            option.setName('clear')
            .setDescription('clear the list')
        }),
        
    async execute(interaction) {
        await interaction.reply(`your tag: ${interaction.user.tag}\nyour id: ${interaction.user.id}`);
    },
};