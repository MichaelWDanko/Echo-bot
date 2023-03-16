const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('user-info')
		.setType(ApplicationCommandType.User),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		console.log(`user-info has been run by ${interaction.user.username}. The full interaction is below:`)
		console.log(`*****************`)
		console.log(interaction)
		await interaction.reply({
			content:`
			This command was run by ${interaction.user}, who chose ${interaction.targetUser}joined on ${interaction.member.joinedAt}. \n
			Interaction.user = ${interaction.user} \n
			Interaction.user.username = ${interaction.user.username} \n
			Interaction.user.tag = ${interaction.user.tag}
			`,
			ephemeral: true
		});
	},
};