const { SlashCommandBuilder, MessageFlags, AttachmentBuilder  } = require('discord.js')
const generateMessage = require('../api/gemini')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gemini')
        .setDescription('Consultar cosas a Gemini')
        .addStringOption(option => 
            option.setName('mensaje')
            .setDescription('Mensaje que quieres que Gemini responda')
            .setRequired(true)
        ),
    async execute(interaction) {
        
        await interaction.deferReply({flags: MessageFlags.Ephemeral});
        
        try{
            const response = await generateMessage(interaction.options.getString('mensaje'));
            
            if (response.length > 2000) {
                const buffer = Buffer.from(response, 'utf-8');
                const file = new AttachmentBuilder(buffer, { name: 'respuesta.txt' });
                await interaction.editReply({ content: '📄 Respuesta muy larga, aquí tienes el archivo:', files: [file], flags: MessageFlags.Ephemeral});            
            } else await interaction.editReply( {content: response, flags: MessageFlags.Ephemeral} );

        } catch(error){
            console.log(error);
            await interaction.editReply({content: 'Ups, ocurrio un error', flags: MessageFlags.Ephemeral} );
        }
    }
}