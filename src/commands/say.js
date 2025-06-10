const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Replies with Pong!')
        .addStringOption(option => 
            option.setName('mensaje')
                .setDescription('El mensaje que quieres que repita')
                .setRequired(true)),
	async execute(interaction) {
        const mensaje = interaction.options.getString('mensaje');
		await interaction.reply({ content: mensaje, ephemeral: true });
	},
};