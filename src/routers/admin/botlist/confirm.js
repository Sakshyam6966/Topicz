const Discord = require('discord.js');
const app = require('express').Router();
const botsdata = require("../../../database/models/botlist/bots.js");
const codesSchema = require("../../../database/models/codes.js");
const uptimedata = require("../../../database/models/uptime.js");
const appsdata = require("../../../database/models/botlist/certificate-apps.js");
let sitedatalari = require("../../../database/models/analytics-site.js");

const roles = global.config.server.roles;
const channels = global.config.server.channels;
const client = global.Client;

console.log("[disbots.xyz]: Admin/Botlist/Confirm Bot router loaded.");

app.get("/admin/confirm/:botID", global.checkAuth, async (req, res) => {
    const botdata = await botsdata.findOne({
        botID: req.params.botID
    })
    if (!botdata) return res.redirect("/error?code=404&message=You entered an invalid bot id.");
    await botsdata.findOneAndUpdate({
        botID: req.params.botID
    }, {
        $set: {
            status: "Approved",
            Date: Date.now(),
        }
    }, function(err, docs) {})
    client.users.fetch(req.params.botID).then(bota => {
        client.channels.cache.get(global.config.server.channels.botlog).send(new Discord.MessageEmbed()
        .setTitle(`<:check:870019748585414686>  Bot Approved!`)
        .setDescription(`**• <:bot:876940784119734312> Bot Name:** <@${bota.id}>
        **• <:owner:876940638560587796> Bot owner:** <@${botdata.ownerID}>
        **• <:members:876940862305751121> Approved by:** <@${req.user.id}>`)
        .setColor("RANDOM")
        .setThumbnail(bota.displayAvatarURL())
        .setFooter(`Thanks for using Vcodez.xyz bot list!`, bota.displayAvatarURL())
        .setTimestamp())
        client.users.cache.get(botdata.ownerID).send(new Discord.MessageEmbed()
        .setTitle(`<:check:870019748585414686> Bot Approved`)
        .setDescription(`<:check:870019748585414686> Your Bot Named **${bota.tag}** \n Has Been Approved by <@${req.user.id}>.`))
        .setColor("BLUE")
        .setFooter(`Thanks For Using Our Website`)
        .setTimestamp()
    });
    let guild = client.guilds.cache.get(config.server.id)
    guild.members.cache.get(botdata.botID).roles.add(global.config.server.roles.botlist.bot);
    guild.members.cache.get(botdata.ownerID).roles.add(global.config.server.roles.botlist.developer);
    if (botdata.coowners) {
        botdata.coowners.map(a => {
            guild.members.cache.get(a).roles.add(global.config.server.roles.botlist.developer);
        })
    }
    return res.redirect(`/admin/unapproved?success=true&message=Bot approved.`)
});

module.exports = app;