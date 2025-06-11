const { EmbedBuilder } = require('discord.js');

const log_act = (oldMessage, newMessage, user_tag) => {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Mensaje actualizado')
        .setDescription(`${user_tag} modificó un mensaje.`)
        .setFields(
            { name: 'Mensaje anterior', value: `${oldMessage}`, inline: true },
            { name: 'Mensaje nuevo', value: `${newMessage}`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: 'Sistema de Logs del Servidor' });
}

const log_borr = (message, user_tag) => {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Mensaje borrado')
        .setDescription(`${user_tag} eliminó un mensaje.`)
        .setFields(
            { name: 'Mensaje eliminado', value: `${message}`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: 'Sistema de Logs del Servidor' });
}

const log_voice = (message, user_tag) => {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`Canal de voz`)
        .setDescription(`${user_tag} se ${message} a un canal de voz`)
        .setTimestamp()
        .setFooter({ text: 'Sistema de Logs del Servidor' });
}

module.exports = {
    log_act,
    log_borr,
    log_voice,
}