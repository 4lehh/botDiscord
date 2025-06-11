const { Events } = require("discord.js");

module.exports = (client) => {
    client.on(Events.InteractionCreate, async interaction => {
        // Valida si es un comando de barra valido
        if(!interaction.isChatInputCommand()) return;

        // Se obtiene el comando
        const command = client.command.get(interaction.commandName);

        // Es un comando? 
        if(!command) return;

        try{
            // Ejecuta
            await command.execute(interaction);
        } catch(error) {
            console.error(error);
            await interaction.reply({content: 'Hubo un error 😥', ephemeral: true});
        }
    });
}