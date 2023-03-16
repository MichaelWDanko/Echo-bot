const { SlashCommandBuilder } = require('@discordjs/builders');
const getGamertag = require('../getGamertag');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('csr-gamertag')
		.setDescription('Get the CSR for the provided Gamertag')
		.addUserOption(option =>
			option.setName('member')
				.setDescription('The Discord user to get the CSR for')
				.setRequired(true)
		),
	async execute(interaction) {

        console.log(`Running csr-gamertag as a SlashCommand. Attempting to lookup Gamertag.`)

		const gamertagResult = await getGamertag(interaction);

		if (!gamertagResult.success) {
			await interaction.reply({
				content: 'An error occurred while fetching the Gamertag.',
				ephemeral: true,
			});
			return;
		}

		const gamertag = gamertagResult.data.xboxLiveGamertag;
        console.log(`New gamertag value is: ${gamertag}`)

		// Continue with your logic to get the CSR for the user using the gamertag
	},
};