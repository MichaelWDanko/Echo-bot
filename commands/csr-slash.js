const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const getCSR = require('../utils/getCSR');
const buildRankEmbeds = require('../utils/buildRankEmbeds');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('csr')
		.setDescription('Get the CSR for a user by entering their gamertag.')
		.addStringOption((option) =>
		option
		  .setName("gamertag")
		  .setDescription("A valid Xbox Live gamertag")
		  .setMaxLength(15)
		  .setRequired(true)
	  ),
	async execute(interaction) {
		try {
			console.log(`csr-slash.js - About to set const: gamertag`)
			const gamertag = interaction.options.getString('gamertag');
			console.log(`csr-slash.js - New value of const gamertag is:`)
			console.log(gamertag)

			console.log(`csr-slash.js - About to set const: csrResponse `)
			const csrResponse = await getCSR(gamertag);
			console.log(`csr-slash.js - New value of const csrResponse is:`)
			console.log(csrResponse)

			// if (!csrResponse.success) {
			// 	await interaction.reply({
			// 		content: `There was an error retrieving the rank for ${gamertag}`,
			// 		ephemeral: true });
			// 	return;
			// }

			let responseEmbeds = []
			
			if ("error" in csrResponse) {
				console.log(`csr-slash.js - Attempting to check for an error in the csrResponse`)
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

			  console.log(`csr-slash.js - About to log value of responseEmbeds:`)
			  console.log(responseEmbeds)

			await interaction.reply({
				embeds: responseEmbeds,
				ephemeral: true,
			});

		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'An error occurred while processing your request as a Discord slash command',
				ephemeral: true,
			});
		}
	},
};