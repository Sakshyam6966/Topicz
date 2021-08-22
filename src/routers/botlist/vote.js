const app = require('express').Router();
const botsdata = require("../../database/models/botlist/bots.js");
const client = global.Client;
const channels = global.config.server.channels;
const Discord = require('discord.js')

console.log("[Topicz.xyz]: Botlist/Vote router loaded.");

app.get("/bot/:botID/vote", async (req, res) => {
    let botdata = await botsdata.findOne({
        botID: req.params.botID
    });
    if (!botdata) return res.redirect("/error?code=404&message=You entered an invalid bot id.");
    if (req.user) {
        if (!req.user.id === botdata.ownerID || req.user.id.includes(botdata.coowners)) {
            if (botdata.status != "Approved") return res.redirect("/error?code=404&message=You entered an invalid bot id.");
        }
    }
    res.render("botlist/vote.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        botdata: botdata,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})
app.post("/bot/:botID/vote", global.checkAuth, async (req, res) => {
    const votes = require("../../database/models/botlist/vote.js");
    let botdata = await botsdata.findOne({
        botID: req.params.botID
    });
    let x = await votes.findOne({
        user: req.user.id,
        bot: req.params.botID
    })
    if (x) return res.redirect("?error=true&message=You can vote every 12 hours.");
    await votes.findOneAndUpdate({
        bot: req.params.botID,
        user: req.user.id
    }, {
        $set: {
            Date: Date.now(),
            ms: 43200000
        }
    }, {
        upsert: true
    })
    await botsdata.findOneAndUpdate({
        botID: req.params.botID
    }, {
        $inc: {
            votes: 1
        }
    })
    client.channels.cache.get(channels.votes).send(new Discord.MessageEmbed()
    .setTitle(`<:vote:872580144714358784> **${req.user.username}** Voted For **${botdata.username}**`)
    .setDescription(`**${botdata.username}** Now Has **\`[Total Votes ${botdata.votes + 1}]\`**` )
    .setTimestamp()
    .setColor("GREEN")
    .setFooter(`Voter: ${req.user.username}`)
    )
    if(botdata.votes+1 == 100) {
    client.channels.cache.get(channels.votes).send(`Congrats ${botdata.ownerID}! Your bot **${botdata.username}** has reached 100 votes!!`)
    }
    if(botdata.votes+1 == 52) {
    client.channels.cache.get(channels.votes).send(`Congrats <@${botdata.ownerID}>! Your bot **${botdata.username}** has reached 52 votes!!`)
    }
    return res.redirect(`/bot/${req.params.botID}/vote?success=true&message=You voted successfully. You can vote again after 12 hours.`);
})


module.exports = app;