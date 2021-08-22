const Discord = require('discord.js');
const vcodes = require("vcodes.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   .setTitle(`Invite Our Bot`)
   .setDescription(`<:check:874980096535060520> [Website](https://topicz.xyz) <:check:874980096535060520>\n\n[Invite Bot List](https://discord.com/api/oauth2/authorize?client_id=874977292869316668&permissions=8&redirect_uri=https%3A%2F%2Ftopicz.xyz%2Fcallback&scope=bot)
   [Invite Server List](https://discord.com/api/oauth2/authorize?client_id=875326994089406505&permissions=8&scope=bot)`)
   .setColor("#7289da")
   .setTimestamp()
  let button = new MessageButton()
  .setStyle('url')
  .setURL('https://discord.com/api/oauth2/authorize?client_id=874977292869316668&permissions=8&redirect_uri=https%3A%2F%2Ftopicz.xyz%2Fcallback&scope=bot') 
  .setLabel('Invite Me')
  .setEmoji('870019597791805521');

  let button2 = new MessageButton()
  .setStyle('url')
  .setURL('https://discord.com/api/oauth2/authorize?client_id=875326994089406505&permissions=8&scope=bot') 
  .setLabel('Invite Server List')
  .setEmoji('870019597791805521');

  let button3 = new MessageButton()
  .setStyle('url')
  .setURL('https://topicz.xyz') 
  .setLabel('Website')
  .setEmoji('870019597791805521');

//let row = new MessageActionRow()
  //.addComponents(button);
return message.channel.send({ embed: embed, buttons: [ button, button2, button3 ]
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
    description: "invite the bot",
    usage: ""
  };
  
