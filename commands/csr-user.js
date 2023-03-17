const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const getGamertag = require('../utils/getGamertag');

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
        
        //Temporary check to return the GT for a user 
        console.log(`New gamertag value is: ${gamertag}`)
        await interaction.reply({
            content:`
            This command was run by ${interaction.user}. \n
            ${interaction.targetUser}'s Gamertag is: ${gamertag}
            `,
            ephemeral: true
        })

		// Continue with your logic to get the CSR for the user using the gamertag
	},
};


// await interaction.reply({
//     content:`
//     This command was run by ${interaction.user}, who chose ${interaction.targetUser}joined on ${interaction.member.joinedAt}. \n
//     Interaction.user = ${interaction.user} \n
//     Interaction.user.username = ${interaction.user.username} \n
//     Interaction.user.tag = ${interaction.user.tag}
//     `,
//     ephemeral: true
// });