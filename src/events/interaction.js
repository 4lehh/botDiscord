const { Events } = require("discord.js");

const fs = require('fs');

// Leer el archivo data.json
const data = fs.readFileSync('src/data.json', 'utf8');

// Convertir lo leido en un objeto
const jsonData = JSON.parse(data);

module.exports = (client) => {
    client.on(Events.InteractionCreate, async interaction => {
        

        try{
            // Es slashcommand? 
            // Valida si es un comando de barra valido
            if(interaction.isChatInputCommand()){
                // Se obtiene el comando
                const command = client.command.get(interaction.commandName);

                // Es un comando? 
                if(!command) return;
                
                // Ejecuta
                await command.execute(interaction);
            } 
            // Es boton?
            else if(interaction.isButton()){
                if(interaction.customId === 'verificacion') {
                    // Obtencion del rol 
                    const rol = interaction.guild.roles.cache.get(jsonData.mensaje_reaccion.rol_id);

                    // Obtener el user
                    const user = interaction.guild.members.cache.get(interaction.user.id);

                    // Se agrega el rol
                    await user.roles.add(rol);
                    await interaction.reply({ content: '¡Rol otorgado con éxito! 🎉', ephemeral: true });
                }
            }            
        } catch(error) {
            console.error(error);
            await interaction.reply({content: 'Hubo un error 😥', ephemeral: true});
        }
    });
}