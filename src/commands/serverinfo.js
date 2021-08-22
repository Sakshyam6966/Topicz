module.exports.run = async(client, message, args) => {
    
    const {MessageEmbed} = require('discord.js')

    const owner = message.guild.ownerID
    const cato =        message.guild.channels.cache.filter(ch => ch.type === 'category').size
let embed = new MessageEmbed()
.setColor(client.color)
.setTitle(`${message.guild.name}`)
.addField("**Owner:**", `<@${owner}>` , true)
.addField("Region", message.guild.region, true)
.addField("Text Channels", message.guild.channels.cache.size, true)
.addField("Members", message.guild.memberCount, true)
.addField("**Role list**", message.guild.roles.cache.size, true)//a70f3e9169546b2c67d301aaeef38.gif
.addField("**Catogory size**", cato, true)
.setThumbnail(message.guild.iconURL())
.setFooter(`${message.author.username}`, message.author.displayAvatarURL())
client.channels.cache.get("874391981269348382").send(`**${message.author.username}** Used The command, +serverinfo`)
message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "serverinfo",
    description: "",
    usage: ""
  };