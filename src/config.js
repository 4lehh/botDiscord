require('dotenv').config();

module.exports = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    clientId: process.env.clientId,
    guildId: process.env.guildId,
};