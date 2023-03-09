const Discord = require('discord.js');
const axios = require('axios');
const tokens = require('./utils/waypoint-tokens');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

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
});

client.login('your-discord-bot-token');
