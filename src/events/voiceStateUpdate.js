const { log_voice } = require('../models/logs.js');

module.exports = (client, canal_log) => {
    client.on('voiceStateUpdate', async (oldState, newState) => {
        // Obtenemos el canal
        const canal = client.channels.cache.get(canal_log);

        // Si existe el canal
        if(!canal) return;
        
        // Si entro un canal
        if(!oldState.channel && newState.channel){
            const embed_voice = log_voice('unió', newState.member.user.id);
            await canal.send({ embeds: [embed_voice] });
        } 
        // Si se salio de un canal
        else if(oldState.channel && !newState.channel){
            const embed_voice = log_voice('salió', newState.member.user.id);
            await canal.send({ embeds: [embed_voice] });
        }
    });
}