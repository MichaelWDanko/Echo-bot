const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const getCSR = require('../utils/getCSR');
const getGamertagFromDiscordInteraction = require('../utils/getGamertag');
const buildRankEmbeds = require('../utils/buildRankEmbeds');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName("Get User's CSR")
		.setType(ApplicationCommandType.User),
	async execute(interaction) {

		console.log(`Running "Get User's CSR" as a UserCommand. Attempting to lookup gamertag.`)

		try {
			// const targetUser = interaction.targetUser;
			const gamertagResponse = await getGamertagFromDiscordInteraction(interaction);

			console.log ()
			if (!gamertagResponse.success) {
				await interaction.reply({
					content: `There was an error retrieving the gamertag for this user`,
					ephemeral: true });
				return;
			}
			
			const gamertag = gamertagResponse.gamertag

			const csrResponse = await getCSR(gamertag);

			if (csrResponse.error) {
				await interaction.reply({
					content: `There was an error retrieving the rank for the gamertag associated to this user`,
					ephemeral: true });
				return;
			}

			const rankEmbeds = []

			await interaction.reply({
				embeds: csrResponse,
			});
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'An error occurred while processing your request as a Discord user command',
				ephemeral: true,
			});
		}
	},
};