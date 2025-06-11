const { SlashCommandBuilder } = require('discord.js')
const { embed_sugerencia } = require('../models/embeds_models.js')
const { canal_sugerencia } = require('../config.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('sugerencia')
		.setDescription('Puedes escribir alguna sugerencia')
        .addStringOption(option => 
            option.setName('value')
            .setDescription('Escribe la sugerencia que quieres mandar')
            .setRequired(true)
        ),
	async execute(interaction) {
		try {
            const value = interaction.options.getString('value');
            const user = interaction.user;
            
            // Canal para la sugerencia 
            const canal = await interaction.guild.channels.fetch(canal_sugerencia);

            // Verifica que sea un canal de texto
            if(!canal.isTextBased() || !canal) return await interaction.reply({ content: 'Este canal no tiene permitido enviar mensajes', ephemeral: true });
            
            // Creacion del embed
            const embed = embed_sugerencia(value, user);

            // Envio embed a sugerencia | FetchReply permite responder para agregar reacciones o mas mensajes
            const message = await canal.send({ embeds: [embed], fetchReply: true});

            // Agregar reacciones
            await message.react('✅');
            await message.react('❌');

            await interaction.reply({content: 'Sugerencia enviada con exito', ephemeral: true});
        } catch(error){
            console.error('Error en comando /sugerencia:', error);
            await interaction.reply({ content: 'No se pudo enviar tu sugerencia', ephemeral: true })
        }
	},
};