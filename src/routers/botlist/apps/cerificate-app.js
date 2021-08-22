const app = require('express').Router();
const Discord = require('discord.js');
const botsdata = require("../../../database/models/botlist/bots.js");
const apps = require("../../../database/models/botlist/certificate-apps.js");
const client = global.Client;

console.log("[disbots.xyz]: Botlist/Certificate Application router loaded.");

app.get("/certification/apply", global.checkAuth, async (req, res) => {
    const userbots = await botsdata.find({
        ownerID: req.user.id
    })
	    res.render("botlist/apps/certificate-app.ejs", {
	        bot: global.Client,
	        path: req.path,
	        config: global.config,
	        user: req.isAuthenticated() ? req.user : null,
	        req: req,
	        roles:global.config.server.roles,
	        channels: global.config.server.channels,
	        userbots: userbots
	    })
});
app.post("/certification/apply", global.checkAuth, async (req, res) => {
    const rBody = req.body;
    if(botsdata.certificate === "Certified") return res.redirect('/error?code=401&message=This bot already certified.');
    let findBot = await apps.findOne({ botID: rBody['bot'] });
    if(findBot) return res.redirect('/error?code=401&message=This bot application already applied.')
    new apps({
        botID: rBody['bot'],
        future: rBody['future'],
        queue: "queue",
    }).save();
    res.redirect("/bots?success=true&message=Certificate application applied.&botID=" + rBody['bot'])
    let botdata = await botsdata.findOne({
            botID: rBody['bot']
        })
    client.channels.cache.get(global.config.server.channels.botlog).send(new Discord.MessageEmbed()
        .setTitle(`Certify Apply`)
        .setDescription(`User **${req.user.username}** requested a certificate for the bot named **${botdata.username}**.`))
});

module.exports = app;