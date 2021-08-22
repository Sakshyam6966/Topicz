const app = require('express').Router();
const botsdata = require("../../../database/models/botlist/bots.js");
const client = global.clientSL;
const channels = global.config.server.channels;
const Discord = require('discord.js')

console.log("[disbots.xyz/servers]: Edit router loaded.");

app.get("/bot/:botID/announcement", global.checkAuth, async (req, res) => {
    const botdata = await botsdata.findOne({
        botID: req.params.botID
    });
    if (!botdata) return res.redirect("/error?code=404&message=You entered an invalid bot id.")
    if (req.user.id == botdata.ownerID || botdata.coowners.includes(req.user.id)) {
	    res.render("botlist/bot/announcement.ejs", {
	        bot: global.Client,
	        path: req.path,
	        config: global.config,
	        user: req.isAuthenticated() ? req.user : null,
	        req: req,
	        roles:global.config.server.roles,
	        channels: global.config.server.channels,
	        botdata: botdata
	    })
    } else {
        res.redirect("/error?code=404&message=To edit this bot, you must be one of its owners.");
    }
});


app.post("/bot/:botID/announcement", global.checkAuth, async (req, res) => {
    let rBody = req.body;
    let {
        title,
        content,
    } = req.body;
    if (!req.params.botID || !content || !title) return res.send({
        error: true,
        message: "Fill the must any blanks."
    });
    if (String(rBody['coowners']).split(',').length > 3) return res.redirect("?error=true&message=You can add up to 3 CO-Owners..")
    if (String(rBody['coowners']).split(',').includes(req.user.id)) return res.redirect("?error=true&message=You cannot add yourself to other CO-Owners.");
    const datum = new Date().toLocaleString();
    await botsdata.findOneAndUpdate({
        botID: req.params.botID
    }, {
        $set: {
            annoucementdesc: content,
            annoucementtitle: title,
            annoucementdate: datum,
        }
    }, function(err, docs) { })
    client.users.fetch(req.params.botID).then(a => {
    client.channels.cache.get(channels.botlog).send(new Discord.MessageEmbed()
    .setTitle(`<:plus:870019597791805521> **${req.user.username}** posted a new announcement for **${a.tag}**`)
    .setDescription(`[Click Here](https://vcodez.xyz/bot/${a.id})`)
    .setColor("GREEN")
    .setTimestamp()
    .setFooter(`By - ${req.user.username}`))
    res.redirect(`?success=true&message=Your announcement has been successfully posted.&botID=${req.params.botID}`)
    });
})

module.exports = app;