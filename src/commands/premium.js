const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  if (!message.member.roles.cache.some((role) => role.name === 'PREMIUM')) return message.channel.send("<:no:833101993668771842> Either the server owner hasnt made a role called **PREMIUM**, or you dont have the **PREMIUM** role! <:no:833101993668771842>");
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<a:yes:833101995723194437> **[Vcodez Premium Cmds](https://vcodez.xyz)** <a:yes:833101995723194437>`)
   .setColor("#7289da")
   .setFooter('Powered By Vcodez.xyz')
   .addField("Premium Cmds", "`+`shorturl" )
   .setImage('https://cdn.discordapp.com/attachments/860627883731320866/872485215262605332/Vcodez.xyz.png')

   let button = new MessageButton()
  .setStyle('url')
  .setURL('https://discord.com/api/oauth2/authorize?client_id=863104463229550612&permissions=8&redirect_uri=https%3A%2F%2Fvcodez.xyz%2Fcallback&scope=bot') 
  .setLabel('Invite')
  .setEmoji('870019597791805521');

  let button2 = new MessageButton()
  .setStyle('url')
  .setURL('https://vcodez.xyz/dc') 
  .setLabel('Support')
  .setEmoji('872580192063860787');
  
  let button3 = new MessageButton()
  .setStyle('url')
  .setURL('https://vcodez.xyz') 
  .setLabel('Website')
  .setEmoji('872580084077326337');
  
  let button4 = new MessageButton()
  .setStyle('url')
  .setURL('https://vcodez.xyz/bot/863104463229550612') 
  .setLabel('Vote')
  .setEmoji('872580144714358784');

let row = new MessageActionRow()
  .addComponents(button, button2, button3, button4);
return message.channel.send({ embed: embed, buttons: [ button,button2,button3,button4 ]
});
   message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["Premium"],
  };
  
  exports.help = {
    name: "premium",
    description: "",
    usage: ""
  };