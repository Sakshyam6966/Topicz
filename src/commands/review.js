const { MessageEmbed } = require('discord.js')
const fetch = require("node-fetch");

module.exports.run = async (client,message,args) => {
     if(!args[0]) return message.channel.send(new MessageEmbed()
     .setDescription("<:no:833101993668771842> Please give us a Number and message\n<:info:876255965249437717> Ex. _+review 10/10 best web!_")
     .setFooter("Thanks for Using Us!")
     .setColor("RANDOM"));
     const msg = args.join(" ");

    client.channels.cache.get("878005906326044722").send(new MessageEmbed()
     .setAuthor(`${message.author.username} Left us a review!`)
      .setDescription('**User Reviwed Vcodez.xyz!**')
      .addFields(

  { name: `User That Reviwed:`, value: `${message.author.username}` ,inline: true },

  { name: `Stars/Review Msg:`, value: `${msg}` ,inline: false },


)
.setFooter("Thanks for the review!")
.setTimestamp()
.setColor("RANDOM"))
const embed = new MessageEmbed()
     .setAuthor(`${message.author.username}`)
      .setDescription('**Review was _Sent!_**')
      .setColor("RANDOM")
      .setFooter("Thanks for reviewing us!")
    message.channel.send(embed);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "review",
    description: "",
    usage: ""
  };