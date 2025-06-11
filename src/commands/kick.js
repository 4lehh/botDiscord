const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kickeas a un usuario')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('Nombre del usuario a kickear')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('razon')
            .setDescription('Razón para kickear a la persona')
            .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	async execute(interaction) {

        // Validar si puede kickear
        if(!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)){
            return await interaction.reply({ content: 'No puedes kickear usuarios', ephemeral: true });
        }

        const user = interaction.options.getUser('user');
        
        // Especie de if ternario si el getString no arroja nada
        const razon = interaction.options.getString('razon') ?? 'No hay razón previa';

        // Solo es necesario para el kick
        const miembro = await interaction.guild.members.fetch(user.id);

        // No expulsarte a ti mismo
        if (miembro.id === interaction.guild.ownerId || miembro.id == interaction.guild.ownerId) {
            return interaction.reply({ content: 'No puedes expulsar al dueño del servidor.', ephemeral: true });
        }

        try{
            await interaction.reply(`Kickeaste a ${user} por ${razon}`);
            await miembro.kick(razon);
        } catch(error) {
            console.log(error);
            return interaction.reply({content: 'No puedes expulsar a este usuario', ephemeral: true});
        }
		
	},
};