const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Banear a un usuario')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('Usuario a banear')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('razon')
            .setDescription('Razon para banear al usuario')
            .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
        try{
            // Validar si puede banear
            if(!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)){
                return await interaction.reply({ content: 'No puedes banear usuarios', ephemeral: true });
            }

            const user = interaction.options.getUser('user');
            const razon = interaction.options.getString('razon');
        
            await interaction.guild.members.ban(user, { razon });
            await interaction.reply({ content: `Haz baneado a ${user}, razón: ${razon}`, ephemeral: true });

        } catch(error) {
            console.log(error);
            await await interaction.reply({ content: 'No pude banear a este usuario', ephemeral: true });
        }
	},
};