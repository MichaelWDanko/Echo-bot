const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');
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
			console.log(`The value of gamertagResponse is:`)
			console.log(gamertagResponse)

			const gamertag = gamertagResponse.xboxLiveGamertag;
			console.log(`The value of gamertag is:`)
			console.log(gamertag)


			// if (!gamertagResponse.success) {
			// 	await interaction.reply({
			// 		content: `There was an error retrieving the gamertag for this user`,
			// 		ephemeral: true });
			// 	return;
			// }

			console.log(`csr-user.js - About to set const: csrResponse `)
			const csrResponse = await getCSR(gamertag);
			console.log(`csr-user.js - New value of const csrResponse is:`)
			console.log(csrResponse)


			if (csrResponse.error) {
				await interaction.reply({
					content: `There was an error retrieving the rank for the gamertag associated to this user`,
					ephemeral: true });
				return;
			}

			let responseEmbeds = []
			
			if ("error" in csrResponse) {
				console.log(`csr-user.js - Attempting to check for an error in the csrResponse`)
				if (csrResponse.error.details?.detail) {
				  await interaction.reply({
					content: csrResponse.error.details.detail,
					ephemeral: true,
				  });
				} else {
				  await interaction.reply({
					content: `An unknown error occurred while attempting to fetch CSR data for \`${gamertag}\`.`,
					ephemeral: true,
				  });
				}
			  } else {
				console.log(`No error in csrResponse. Attempting to set responseEmbeds to result of buildRankEmbeds`)
				responseEmbeds = buildRankEmbeds(csrResponse)
			  }

			  console.log(`csr-user.js - About to log value of responseEmbeds:`)
			  console.log(responseEmbeds)

			await interaction.reply({
				embeds: responseEmbeds,
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