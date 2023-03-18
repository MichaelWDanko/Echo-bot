const fs = require('node:fs');
const path = require('node:path');

const Discord = require('discord.js');
// const axios = require('axios');
// const tokens = require('./utils/waypoint-tokens');


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

//Attach a .commands property to your client instance so that you can access your commands in other files.
client.commands = new Discord.Collection();

client.login(BOT_TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// console.log('Now logging the BOT_TOKEN')
// console.log(process.env.BOT_TOKEN)
// console.log('Now logging client ID')
// console.log(process.env.CLIENT_ID)


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
	const command = require(filePath);

  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}

}

client.on(Discord.Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand) {
    console.error(`Received an interaction I can't handle`);
    
    return;
  } 
  console.log(interaction)

  const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}

})


// Old Code that I should probably remove since I'm using the SlashCommandBuilder
//
/*
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
//
*/