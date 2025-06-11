const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbanea a un usuario')
	.addUserOption(option => 
		option.setName('user')
		.setDescription('Nombre del usuario')
		.setRequired(true))
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		try{
			const user = interaction.options.getUser('user');
		
			await interaction.guild.members.unban(user.id);
			await interaction.reply({ content: `El usuario ${user.tag} ha sido unbaneado. `, ephemeral: true });
		} catch(error){
			return await interaction.reply({ content: `No ha podido unbanear a ${user.tag}`, ephemeral: true });
		}
	},
};