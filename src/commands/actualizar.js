const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js')
const { deployCommands } = require('../deploy-commands.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('actualizar')
        .setDescription('Actualiza los comandos del servidor')
        .setDefaultMemberPermissions(0),
        
        async execute(interaction) {
            deployCommands();
            // Lógica para actualizar la información del bot
            await interaction.reply({ content: `Se ha actualizado los comandos del bot`, flags: MessageFlags.Ephemeral });
    }
}