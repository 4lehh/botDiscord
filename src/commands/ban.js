const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Banear a un usuario')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('Usuario a banear')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
        try{
            // Validar si puede banear
            if(!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)){
                return await interaction.reply({ content: 'No puedes banear usuarios', flags: MessageFlags.Ephemeral });
            }

            const user = interaction.options.getUser('user');
        
            interaction.guild.members.ban(user);
            await interaction.reply({ content: `Haz baneado a ${user}, razón: ${razon}`, flags: MessageFlags.Ephemeral });

        } catch(error) {
            console.log(error);
            await await interaction.reply({ content: 'No pude banear a este usuario', flags: MessageFlags.Ephemeral });
        }
	},
};