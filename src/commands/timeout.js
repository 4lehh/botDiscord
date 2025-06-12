const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Timeout a un usuario')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('Usuario a quien le daras timeout')
            .setRequired(true))
        .addIntegerOption(option => 
            option.setName('duracion')
            .setDescription('Tiempo del timeout')
            .addChoices(
                {name: 'Quitar timeout', value: 0},
                {name: '30 minutos', value: 30},
                {name: '1 hora', value: 60},
                {name: '3 horas', value: 180},
                {name: '1 día', value: 1440},
            )
            .setRequired(true))
        .addStringOption(option => 
            option.setName('razon')
            .setDescription('Razón del timeout')
            .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
	async execute(interaction) {
        try {
            // Validar si puede banear
            if(!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)){
                return await interaction.reply({ content: 'No puedes dar timeout a los usuarios', flags: MessageFlags.Ephemeral });
            }

            const user = interaction.options.getUser('user');
            const duracionMin = interaction.options.getInteger('duracion'); // en minutos
            let duracion = duracionMin * 60000; // Duracion en ms
            const razon = interaction.options.getString('razon') ?? 'No hay razón';

            const MAX_TIMEOUT = 28 * 24 * 60 * 60000; // 28 días en ms
            if (duracion > MAX_TIMEOUT) duracion = MAX_TIMEOUT;
            if (duracion <= 0) duracion = null;

            // Ver si se encuentra en la caché 
            let member = await interaction.guild.members.cache.get(user.id);
            
            if(!member) member = await interaction.guild.members.fetch(user.id);
            
            if (!member.isCommunicationDisabled() && duracion === null) {
                return interaction.reply("Este usuario no tiene un timeout activo.");
            }

            // aplicar el timeout
            member.timeout(duracion, razon);
            

            if(duracion === 0){
                return await interaction.reply({content: `⏳ Ha ${user.tag} se le ha quitado el aislamiento.`, flags: MessageFlags.Ephemeral});
            }

            await interaction.reply({content: `⏳ ${user.tag} ha sido aislado por ${duracion / 60000} minutos. Razón: ${razon}`, flags: MessageFlags.Ephemeral});

            
        } catch(error) {
            console.log(error);
            await await interaction.reply( {content: `No se ha podido aplicar el timeout a ${user.tag}.`, flags: MessageFlags.Ephemeral});
        }
    
    },
};