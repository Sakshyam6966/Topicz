const Discord = require('discord.js');
const fetch = require("node-fetch");
exports.run = (client, message, args) => {
    if(!global.config.bot.owners.includes(message.author.id)) return  message.reply('could not be granted access permission.')
	message.channel.send("Vcodez: Shuttingdown.").then(msg => {
		console.log(`BOT : Shuttingdown...`);
		process.exit(1);
	})
};
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: []
};
exports.help = {
	name: 'shutdown',
	description: 'Botu Yeniden Başlatır.',
	usage: 'reboot'
};