const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('A friendly hello'),
    async execute(interation) {
        await interation.reply("Hello there")
    }
}