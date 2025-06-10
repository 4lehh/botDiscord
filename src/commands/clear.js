const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Elimana mensajes')
        .addIntegerOption(option => 
            option.setName('número')
                .setDescription('Elimina un numero de mensajes')
                .setMaxValue(100)
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction) {
        const roles_permitidos = ['1381833948425883679'];

        const tiene_el_rol = interaction.member.roles.cache.some(rol => roles_permitidos.includes(rol.id));
        
        if(!tiene_el_rol) return await interaction.reply({content: 'No estas permitido para ejecutar este comando', ephemeral: true});
        
        // Obtener el numero
        let number = interaction.options.getInteger('número');
        
        // Si no hay un numero
        if (!number) number = 1; 
		
        // Ejecutar el clean
        const mensajes_borrados = await interaction.channel.bulkDelete(number, true).catch(err => {
                console.error(err);
                return null;
            });
        
        // Si no resulta
        if(!mensajes_borrados) return await interaction.reply({content: 'Hubo un error al eliminar', ephemeral: true});
        
        // Mensaje de exito
        await interaction.reply({content: 'Borrado con exito', ephemeral: true});
	},
};