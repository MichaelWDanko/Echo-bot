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
        
        //Temporary check to return the GT for a user
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