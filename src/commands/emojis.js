const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<a:yes:833101995723194437> **[Vcodez Bot Emojis](https://vcodez.xyz)** <a:yes:833101995723194437>\n\n**Here are my emojis,\n<:cross:870019707065991178><:check:870019748585414686><:edited:870019650593910875><a:yes:833101995723194437><:plus:870019597791805521><:no:833101993668771842>\nWant to suggest better ones? Join my [support](http://vcodez.xyz/dc) server!**`)
   .setColor("#7289da")
   .setFooter('Powered By Vcodez.xyz')
         let button = new MessageButton()
  .setStyle('url')
  .setURL('https://cdn.discordapp.com/attachments/860646667597381632/872584244264841286/emoji.png') 
  .setLabel('')
    .setEmoji('870019597791805521');

             let button2 = new MessageButton()
  .setStyle('url')
  .setURL('https://cdn.discordapp.com/attachments/860646667597381632/872584721132036166/emoji.png') 
  .setLabel('')
    .setEmoji('872580084077326337');

                 let button3 = new MessageButton()
  .setStyle('url')
  .setURL('https://cdn.discordapp.com/attachments/860646667597381632/872584937721716807/emoji.png') 
  .setLabel('')
    .setEmoji('870019748585414686');

                     let button4 = new MessageButton()
  .setStyle('url')
  .setURL('https://cdn.discordapp.com/attachments/860646667597381632/872585283709853697/emoji.png') 
  .setLabel('')
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
    aliases: ["emoji"],
  };
  
  exports.help = {
    name: "emojis",
    description: "",
    usage: ""
  };