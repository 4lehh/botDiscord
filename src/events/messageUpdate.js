const { log_act } = require('../models/logs.js');

module.exports = (client, canal_log) => {
    client.on('messageUpdate', async (oldMessage, newMessage) => {
        // Si el mensaje llega completo
        if(oldMessage.partial || newMessage.partial) return;
        
        // Si el mensaje tiene contenido
        if(!oldMessage.content || !newMessage.content) return;

        // Obtenemos el canal
        const canal = client.channels.cache.get(canal_log);
        
        // Si existe el canal
        if (!canal) return; 

        const embed_log = log_act(oldMessage, newMessage, oldMessage.author)
        
        await canal.send({ embeds: [embed_log] });
    });
}