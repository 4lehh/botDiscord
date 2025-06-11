const { EmbedBuilder } = require('discord.js');

const embed_sugerencia = (message, user_tag) => {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Sugerencias para el server')
        .setDescription(`${user_tag}: ${message}`)
        .setTimestamp()
        .setFooter({ text: 'Sistema de sugerencias' });
} 

module.exports = {
    embed_sugerencia,
}