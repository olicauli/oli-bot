module.exports = {
    name: 'message',
    async execute(message) {
        console.log('in message');
        if (message.author === message.client.user) return;
        if (message.content.contains("ily hythlodaeus please respond"))
        {
            console.log('in message ily');
            await message.react('💞');
            await message.reply('<3');
        }
    }
}