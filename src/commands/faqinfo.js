const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<:Thinking:866089513997959178> **[Vcodez Information](https://vcodez.xyz)** <:Thinking:866089513997959178>\nVcodez is a Bot And Server List originally developed by [vCodes.xyz](https://vcodes.xyz/)\n\nAbout Me:\n**Masterious is my developer, he has created Vcodez with all its cmds!\n[vCodes](https://vcodes.xyz) Created [Vcodez](https://vcodez.xyz)'s base but is made better by Masterious!\n\nMy Links:\nInvite me [here](https://vcodezbot.tk/)\nVisit my [uptimer web](https://vcodezuptime.tk/)\nVisit [Vcodez!](https://vcodez.xyz)\n\nMade with :heart: by Masterious.**`)
   .setColor("#7289da")
   .setThumbnail('https://cdn.discordapp.com/attachments/860628976572563507/870721630106681404/standard_5.gif')
   .setFooter('Made with ❤️')
   message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["info"],
  };
  
  exports.help = {
    name: "faq",
    description: "",
    usage: ""
  };