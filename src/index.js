const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { token, canal_log }= require("./config.js"); // Configuracion del bot

// Primero creamos el cliente
const client = new Client( {intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    ], 
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// Hasheo de los comandos con su respectivo execute
client.command = new Collection();

// leer los comandos de la carpeta commands 
const commands_path = path.join(__dirname, 'commands');
const files = fs.readdirSync(commands_path)

// Cargar comandos 
for (const file of files){
    const command = require(`./commands/${file}`);
    // Setea el nombre y el comando
    client.command.set(command.data.name, command)
}

// Cargar eventos (Interactions, logs)
require('./events/interaction.js')(client);
require('./events/messageReactionAdd.js')(client);
require('./events/messageUpdate.js')(client, canal_log);
require('./events/messageDelete.js')(client, canal_log);
require('./events/voiceStateUpdate.js')(client, canal_log)

// Activacion del bot
client.once('ready', () => {
    console.log(`Bot iniciado como ${client.user.tag}`);
});


// Omitir warning por ephemeral
process.removeAllListeners('warning');

client.login(token); // Usas el token aquí, NO lo muestras