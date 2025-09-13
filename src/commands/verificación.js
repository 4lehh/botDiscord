const { SlashCommandBuilder, EmbedBuilder, MessageFlags, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verificar')
		.setDescription('Creacion de un mensaje de verificación')
        .addChannelOption(option => 
            option.setName('channel')
            .setDescription('Canal a donde enviar el embed')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('titulo')
            .setDescription('Titulo del embed')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('description')
            .setDescription('Añade una descripcion corta al embed (no toda la informacion)')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('image')
            .setDescription('Imagen para el embed')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('url')
            .setDescription('URL necesario para el embed')
            .setRequired(false)
        )
        .addStringOption(option=>
            option.setName('color')
            .setDescription('Color del embed')
            .setChoices(
                {name: 'rojo', value: '#e6160c'},
                {name: 'azul', value: '#0000ff'},
                {name: 'verde', value: '#17b50d'},
            )
            .setRequired(false)),
	
    async execute(interaction) {
        try{
            const user = interaction.user;
            const channel = interaction.options.getChannel('channel')
            const titulo = interaction.options.getString('titulo');
            const url = interaction.options.getString('url') ?? 'https://4lehh.github.io';
            const description = interaction.options.getString('description');
            const image = interaction.options.getString('image');
            const color = interaction.options.getString('color') ?? '#ffffff';

            const embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(titulo)
                .setURL(url)
                .setAuthor( {name: user.username, iconURL: user.displayAvatarURL({ format: 'png', size: 1024 })})
                .setDescription(description)
                .setImage(image)
                .setTimestamp()
                .setFooter({ text: `Hecho por ${user.username}`, iconURL: user.displayAvatarURL() });
            
            // Crear Boton
            const button = new ButtonBuilder()
                .setCustomId('verificacion')
                .setLabel('✅')
                .setStyle(ButtonStyle.Primary);

            // Meter en una fila
            const row = new ActionRowBuilder()
                .addComponents(button);

            // Enviar el mensaje
            channel.send({embeds: [embed], components: [row] });

            await interaction.reply({ content: 'Embed hecho con exito', flags: MessageFlags.Ephemeral });
        } catch(error){
            console.log(error);
            return await interaction.reply({ content: 'Error al ejecutar el comando', flags: MessageFlags.Ephemeral });
        }
    },
};