const Discord = require('discord.js');
const axios = require('axios');
const tokens = require('./utils/waypoint-tokens');


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} 

const BOT_TOKEN = process.env.BOT_TOKEN;

const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.MessageContent,
		Discord.GatewayIntentBits.GuildMembers
  ]
});
client.login(BOT_TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

console.log('Now logging the BOT_TOKEN')
console.log(process.env.BOT_TOKEN)
console.log('Now logging client ID')
console.log(process.env.CLIENT_ID)

client.on('message', async message => {
  if (message.content.startsWith('!halo-csr')) {
    try {
      const gamertag = message.content.split(' ')[1];
      const headers = await tokens.get_halo_infinite_headers();
      const response = await axios.get(`https://www.halowaypoint.com/proxy/commerce/h5credits/${gamertag}`, { headers });
      const csr = response.data.CampaignCsr;
      const rank = csr.MatchMakingResult.Results[0].Rank.MatchMakingRank.Rank;
      message.reply(`Your current CSR rank is ${rank}`);
    } catch (error) {
      console.error(error);
      message.reply('Internal server error');
    }
  }

  if (message.content.startsWith('!hello')) {
    try {
      message.reply('Hello there!')
    } catch (error) {
      console.error(error);
      message.reply('Internal server error')
    }
  }
});