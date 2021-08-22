const { MessageEmbed } = require('discord.js')
const fetch = require("node-fetch");

module.exports.run = async (client,message,args) => {
     if(!args[0]) return message.channel.send(new MessageEmbed()
     .setDescription("<:no:833101993668771842> Please give us a reason on why you should be unbanned from Vcodez!\n<:info:876255965249437717> Ex. _+appeal pls i did nothing wrong!_")
     .setFooter("Thanks for Using Us!")
     .setColor("RANDOM"));
     const msg = args.join(" ");

    client.channels.cache.get("878005907546583051").send(new MessageEmbed()
     .setAuthor(`${message.author.username} Asked for an unban!`)
      .setDescription('**User ban appealed from Vcodez.xyz!**')
      .addFields(

  { name: `User That wishes an un-ban:`, value: `${message.author.username}` ,inline: true },

  { name: `User's Reason of Un-ban:`, value: `${msg}` ,inline: false },


)
.setFooter("Our admins will decide!")
.setTimestamp()
.setColor("RANDOM"))
const embed = new MessageEmbed()
     .setAuthor(`${message.author.username}`)
      .setDescription('**Appeal was _Sent!_**')
      .setColor("RANDOM")
      .setFooter("Thanks for asking!")
    message.channel.send(embed);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "appeal",
    description: "",
    usage: ""
  };