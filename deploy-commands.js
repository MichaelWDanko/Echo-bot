const { REST, Routes } = require('discord.js');
// const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const BOT_TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const commands = [];

const commandsPath = path.join(__dirname, "commands");

const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

rest
.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
.then(() => {
    console.log(
    `Successfully deleted all global commands for client ${CLIENT_ID}.`
    );
    rest
    .put(Routes.applicationCommands(CLIENT_ID), { body: commands })
    .then(() =>
        console.log(
        `Successfully registered global commands for client ${CLIENT_ID}.`
        )
    )
    .catch(console.error);
})
.catch(console.error);