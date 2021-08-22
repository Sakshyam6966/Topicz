const { MessageEmbed } = require('discord.js')
const fetch = require("node-fetch");

module.exports.run = async (client,message,args) => {
     if(!args[0]) return message.channel.send(new MessageEmbed()
     .setDescription("<:no:833101993668771842> Please mention someone to report.\n<:info:876255965249437717> Ex. _+report @Masterious Bad owner_")
     .setFooter("You must mention someone and give a reason")
     .setColor("RANDOM"));
     const msg = args.join(" ");

 const wuser = message.mentions.users.last();
    client.channels.cache.get("878005907022291014").send(new MessageEmbed()
     .setAuthor(`${message.author.username}`)
      .setDescription('**User Reported!**')
      .addFields(

  { name: `User That Reported:`, value: `${message.author.username}` ,inline: true },

  { name: `Who was reported:`, value: `${wuser.username}` ,inline: true },

    { name: `Reason:`, value: `${msg}` ,inline: false }

)
.setFooter("Thanks for the report! An owner/Staff will review your report!")
.setTimestamp()
.setColor("#FF0000"))
const embed = new MessageEmbed()
     .setAuthor(`${message.author.username}`)
      .setDescription('**Report was _Sent!_**')
      .setColor("RANDOM")
      .setFooter("Thanks for reporting them to us!")
    message.channel.send(embed);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "report",
    description: "",
    usage: ""
  };