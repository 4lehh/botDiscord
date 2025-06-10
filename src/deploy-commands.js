const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token, clientId, guildId } = require('./config.js'); // Asegúrate de tener esto en config.js

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON()); // importante para la API de Discord
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log('⬆️  Refrescando (registrando) los slash commands...');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId), // para probar en un servidor específico
			{ body: commands },
		);

		console.log('✅ ¡Comandos actualizados correctamente!');
	} catch (error) {
		console.error(error);
	}
})();