const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Replies with Pong!')
        .addStringOption(option => 
            option.setName('mensaje')
                .setDescription('El mensaje que quieres que repita')
                .setRequired(true))
		.addChannelOption(option =>
			option.setName('canal')
			.setDescription('Envia un mensaje a un canal especifico')
			.setRequired(true)
		),
	async execute(interaction) {
		try{
			// Extraer los valores
			const mensaje = interaction.options.getString('mensaje');
			const channel = interaction.options.getChannel('canal');

			if(!channel.isTextBased()) return interaction.reply({ content: 'Este canal no tiene permitido enviar mensajes', ephemeral: true });

			// Envia mensaje al canal
			await channel.send(mensaje)
			
			// Respuesta de que funcionó
			await interaction.reply({ content: 'Mensaje enviado con exito', ephemeral: true });
		} catch(error){
			return await interaction.reply({ content: 'Error al ejecutar el comando', ephemeral: true });
		}
	},
};