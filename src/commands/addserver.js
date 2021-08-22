const Discord = require('discord.js');
const vcodes = require("vcodes.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<a:yes:833101995723194437> **[Vcodez Add Server](https://vcodez.xyz)** <a:yes:833101995723194437>\n\nyou can add your server [here](https://vcodez.xyz/server/add) NOTE, YOU MUST BE LOGGED IN OR YOU WILL HAVE AN ERROR`)
   .setColor("#7289da")
   .setFooter('Powered by Vcodez.xyz')
      let button = new MessageButton()
  .setStyle('url')
  .setURL('https://vcodez.xyz/server/add') 
  .setLabel('Add your server')
    .setEmoji('870019597791805521');


let row = new MessageActionRow()
  .addComponents(button);
return message.channel.send({ embed: embed, buttons: [ button ] 
});
   
   message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "addserver",
    description: "",
    usage: ""
  };
  