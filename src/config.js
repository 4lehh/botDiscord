require('dotenv').config();

module.exports = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    clientId: process.env.clientId,
    guildId: process.env.guildId,
    roles_permitidos: process.env.roles_permitidos,
    canal_log: process.env.canal_log,
    canal_sugerencia: process.env.canal_sugerencia,
    key_gemini: process.env.KEY_API,
};