const Discord = require('discord.js')

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('hello')
        .setDescription('A friendly hello'),
    async execute(interation) {
        await interation.reply("Hello there")
    }
}