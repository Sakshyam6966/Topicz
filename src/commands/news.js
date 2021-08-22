const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<a:yes:833101995723194437> **[Vcodez Latest News](https://vcodez.xyz)** <a:yes:833101995723194437>\n\n8/3/21\nwe now have an official app! Download it [here!](https://appsgeyser.io/14206789/Vcodez)\n\n8/4/21\nWe now have Discord-Buttons! Thanks to <@821696185647497256>! Say +help, +invite, and +news to see them!\n\nTo View More news, Click the button Below!`)
   .setColor("#7289da")
      .setFooter('Powered By Vcodez.xyz')
   
  let button = new MessageButton()
  .setStyle('url')
  .setURL('https://vcodez.xyz/news')
  .setLabel('View More News Here')
  .setEmoji('872523515230847027');


let row = new MessageActionRow()
  .addComponents(button);
return message.channel.send({ embed: embed, buttons: [ button ]
});
   message.channel.send(embed)
  
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["News"],
  };
  
  exports.help = {
    name: "news",
    description: "",
    usage: ""
  };  