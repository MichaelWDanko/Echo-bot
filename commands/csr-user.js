const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const getGamertag = require('../getGamertag');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName("Get User's CSR")
		.setType(ApplicationCommandType.User),
	async execute(interaction) {

        console.log(`Running csr-user as a UserCommand. Attempting to lookup Gamertag.`)

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