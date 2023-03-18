const { SlashCommandBuilder } = require('discordjs');
const getCSR = require('../utils/getCSR');
const EmbedBuilder = require('../EmbedBuilder');

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
			const gamertag = interaction.options.getString('gamertag');

			const rankEmbeds = await getCSR(gamertag);

			if (rankEmbeds.error) {
				await interaction.reply({
					content: `There was an error retrieving the rank for ${gamertag}`,
					ephemeral: true });
				return;
			}

			await interaction.reply({
				embeds: rankEmbeds,
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