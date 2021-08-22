const { MessageEmbed } = require('discord.js')
const fetch = require("node-fetch");

module.exports.run = async (client,message,args) => {
    if (!message.member.roles.cache.some((role) => role.name === 'PREMIUM')) return message.channel.send("<:no:833101993668771842> Either the server owner hasnt made a role called **PREMIUM**, or you dont have the **PREMIUM** role! <:no:833101993668771842>");
     if(!args[0]) return message.channel.send("Error: Please give us a url to shorten.");
   const url = args.join(" ");

    const data = await fetch(
      `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`
    ).then((res) => res.json());

    const embed = new MessageEmbed()
     .setAuthor(`${message.author.username}`)
      .setDescription('**[URL](https://en.wikipedia.org/wiki/URL) Shortened!**')
      .addFields(

  { name: `Original URL`, value: `${url}` ,inline: true },

  { name: `Shortened URL`, value: `${data.shorturl}` ,inline: false }

)
.setTimestamp()
.setColor("#FF0000")
    message.channel.send(embed);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "shorturl",
    description: "",
    usage: ""
  };