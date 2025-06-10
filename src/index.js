const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Events } = require("discord.js");
const { token, prefix }= require("./config.js"); // Configuracion del bot

// Primero creamos el cliente
const client = new Client( {intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMessages,
    ] 
});

// Hasheo de los comandos con su respectivo execute
client.command = new Collection();

// leer los comandos de la carpeta commands 
const commands_path = path.join(__dirname, 'commands');
const files = fs.readdirSync(commands_path)

for (const file of files){
    const command = require(`./commands/${file}`);
    // Setea el nombre y el comando
    client.command.set(command.data.name, command)
}

client.once('ready', () => {
    console.log(`Bot iniciado como ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = client.command.get(interaction.commandName);

    if(!command) return;

    try{
        await command.execute(interaction);
    } catch(error) {
        console.error(error);
        await interaction.reply({content: 'Hubo un error 😥', ephemeral: true});
    }

})

client.on('messageCreate', (message) => {
    // Si es de un bot o sin prefijo, lo ignora
    if(message.author.bot || !message.content.startsWith(prefix)) return;

    // Saco el comando del mensaje
    // slice omite parte del texto (prefix)
    // trim elimina espacios del final e inicio
    // split separa por los espacios 
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    
    // shift hace pop del primer elemento de args
    const commandName = args.shift().toLocaleLowerCase();

    // Si no es un comando, ignorar
    if(!client.command.has(commandName)) return;

    try{
        // Va a obtener el comando y va a aplicar la regla execute
        client.command.get(commandName).execute(message, args);
    } catch(error){
        console.log(error);
    }
});

// Omitir warning
process.removeAllListeners('warning');

client.login(token); // Usas el token aquí, NO lo muestras