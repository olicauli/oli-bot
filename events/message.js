module.exports = {
    name: 'message',
    async execute(message) {
        if (message.author == message.client.user) return;
        if (message.content.contains("ily"))
        {
            await message.react('💞')
            await message.reply('<3');
        }
    }
}