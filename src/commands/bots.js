const disbots = require("disbots-xyz");
const Discord = require('discord.js')
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
   let x = await botdata.find();
   
   let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   try{
     const embedsearch = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<:search:876255860614115358> *Searching your account*\n\n<:info:876255965249437717> *This may take a second be patient*`)
   .setColor("#7289da")
   .setFooter(`Bots will show below`)
   editthis = await message.channel.send(embedsearch)
   await sleep(3000)
   await editthis.delete()
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<:search:876255860614115358> *Searched Your account*\n\n*You Own* \`\`${bots.length || 0}\`\` *Discord Bot(s) in Vcodez*`)
   .setColor("#7289da")
   .setFooter(`Powered by Vcodez.xyz`)
   .addField("Bots", `${!bots ? "" : bots.map(a => "<@"+a.botID+">").join("\n")}`, true)
   await message.channel.send(embed)
   } catch(e) {
   await editthis.delete()
   const embednobots = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<:search:876255860614115358> *Searched your account*\n\n<:info:876255965249437717> *You dont have any bots on our website*`)
   .setColor("#7289da")
   .setFooter(`vCodesz.xyz`)
   await message.channel.send(embednobots)
   }
   
};
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "bots",
    description: "",
    usage: ""
  };