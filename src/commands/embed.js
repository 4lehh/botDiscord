const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Creacion de un embed')
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
            option.setName('sub-titulo')
            .setDescription('Descripcion general')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('regular')
            .setDescription('Subtexto para la descripcion')
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
                {name: 'rojo', value: 'e6160c'},
                {name: 'azul', value: '0x0099FF'},
                {name: 'verde', value: '17b50d'},
            )
            .setRequired(false)),
	
    async execute(interaction) {
        try{
            const user = interaction.user;
            const channel = interaction.options.getChannel('channel')
            const sub_titulo = interaction.options.getString('sub-titulo')
            const titulo = interaction.options.getString('titulo');
            const url = interaction.options.getString('url') ?? 'https://4lehh.github.io';
            const description = interaction.options.getString('description');
            const regular = interaction.options.getString('regular');
            const image = interaction.options.getString('image');
            const color = interaction.options.getString('color') ?? 'ffffff';

            const embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(titulo)
                .setURL(url)
                .setAuthor( {name: user.username, iconURL: user.displayAvatarURL({ format: 'png', size: 1024 })})
                .setDescription(description)
                .addFields(
                    {name: sub_titulo, value: regular},
                )
                .setImage(image)
                .setTimestamp()
                .setFooter({ text: `Hecho por ${user.username}`, iconURL: user.displayAvatarURL() });
            channel.send({embeds: [embed]});

            await interaction.reply({ content: 'Embed hecho con exito', ephemeral: true });
        } catch(error){
            return await interaction.reply({ content: 'Error al ejecutar el comando', ephemeral: true });
        }
    },
};