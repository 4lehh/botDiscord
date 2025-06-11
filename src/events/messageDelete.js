const { log_borr } = require('../models/logs.js');

module.exports = (client, canal_log) => {
    client.on('messageDelete', async message => {
        // Si el mensaje está completo
        if(message.partial) return;

        // Si el mensaje tiene contenido
        if(!message.content) return;

        // Obtenemos el canal
        const canal = client.channels.cache.get(canal_log);

        // Si existe el canal
        if(!canal) return;

        // Creacion embed
        const embed_borr = log_borr(message.content, message.author);
        
        await canal.send({ embeds: [embed_borr] });

    });
}