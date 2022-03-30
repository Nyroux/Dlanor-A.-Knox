const { SlashCommandBuilder } = require('@discordjs/builders');
const pokedex = require('../pokedex.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokemon')
		.setDescription('Replies with a random pokemon'),
	async execute(interaction) {
		// generate pkmn
		let pokemon = Math.floor(Math.random() * (pokedex.length-1 - 0 + 1) + 0);

		//check pkmn name
		let sanitizedPokemon = pokedex[pokemon].name.english.toLowerCase();
		// farfetch'd
		if (sanitizedPokemon.search("'")){
			sanitizedPokemon = sanitizedPokemon.replace("'", "");
		} 

		// Mr. Mime and Mime Jr.
		if (sanitizedPokemon.search(/\./)){
			sanitizedPokemon = sanitizedPokemon.replace(".", "");
			
		}
		if (sanitizedPokemon.search(" ")){
			sanitizedPokemon = sanitizedPokemon.replace(" ", "-");
		}

		// Shiny 1/50
		if(Math.floor(Math.random() * (50-1 - 0 + 1) + 0) == Math.floor(Math.random() * (50-1 - 0 + 1) + 0)){
			var color = ["shiny",'Shiny ','#FF2277'];
		} else {
			var color = ["normal",'','#0099ff'];
		}

		//embed
		const pokemonEmbed = new MessageEmbed()
			.setColor(color[2])
			.setDescription("You've caught a **"+color[1]+pokedex[pokemon].name.english+"**!")
			.setImage('https://img.pokemondb.net/sprites/black-white/anim/'+color[0]+'/'+sanitizedPokemon+'.gif')
		//reply
			await interaction.reply({ embeds: [ pokemonEmbed ] });
	},
};
