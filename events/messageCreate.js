module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author === message.client.user) return;
        if (message.content === "ily hythlodaeus please respond")
        {
            await message.react('💞');
        }
    }
};