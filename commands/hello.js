const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('A friendly hello'),
    async execute(interation) {
        console.log('logging within the execute(interaction) of hello.js')
        await interation.reply("Hello there")
    }
}