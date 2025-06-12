const { Events } = require('discord.js');
const fs = require('fs');

// Leer el archivo data.json
const data = fs.readFileSync('src/data.json', 'utf8');

// Convertir lo leido en un objeto
const jsonData = JSON.parse(data);


module.exports = (client) => {
    client.on(Events.MessageReactionAdd, async (reaction, user) => {
        console.log('alguien reaccionó');
        try{
            // Ignorar si la reacción es del bot mismo
            if (user.bot) return;

            // Obtener ID del mensaje
            const message = reaction.message;
            
            // Si no viene del mismo mensaje, fuera.
            if(message.id !== jsonData.mensaje_reaccion.mensaje_id) return console.log('No es el mismo mensaje');
            
            if(reaction.emoji.name !== '🤓') return;

            // Obtencion del rol 
            const rol = message.guild.roles.cache.get(jsonData.mensaje_reaccion.rol_id);

            if(!rol) return console.log('Rol no encontrado');
            
            // Guild
            const guild = message.guild;
            // Obtener el usuario
            const miembro = await guild.members.fetch(user.id);

            // Se agrega el rol
            await miembro.roles.add(rol);
        } catch(error){
            return console.log(error);
        }
    });
}