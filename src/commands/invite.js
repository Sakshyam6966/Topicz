const Discord = require('discord.js');
const vcodes = require("vcodes.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<a:yes:833101995723194437> **[Vcodez Invite](https://vcodez.xyz)** <a:yes:833101995723194437>\n\nInvite me [here](https://discord.com/api/oauth2/authorize?client_id=863104463229550612&permissions=8&redirect_uri=https%3A%2F%2Fvcodez.xyz%2Fcallback&scope=bot)`)
   .setColor("#7289da")
   .setFooter('Made with ❤️')
      let button = new MessageButton()
  .setStyle('url')
  .setURL('https://discord.com/api/oauth2/authorize?client_id=863104463229550612&permissions=8&redirect_uri=https%3A%2F%2Fvcodez.xyz%2Fcallback&scope=bot') 
  .setLabel('Invite me')
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
    aliases: ["inv"],
  };
  
  exports.help = {
    name: "invite",
    description: "",
    usage: ""
  };
  