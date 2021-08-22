const app = require('express').Router();
const client = global.Client;
const botsdata = require("../database/models/botlist/bots.js");

console.log("[disbots.xyz]: Mini pages router loaded.");

app.get("/error", async (req,res) => {
    res.render("error.ejs", {
    	bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/bugreport/bug", async (req,res) => {
    res.render("botlist/bugreport.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/bugreport", async (req,res) => {
    res.render("botlist/bugslist.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/credits", async (req,res) => {
    res.render("botlist/credits.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/faq", async (req,res) => {
    res.render("botlist/faq.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})


app.get("/all-faq", async (req,res) => {
    res.render("botlist/all-faq.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/premium/panel", global.checkAuth, async (req,res) => {
    let user = req.user;
    let guild = client.guilds.cache.get("860627883731320862");
    let checkUser = guild.members.cache.get(user.id);
    if(!checkUser) return res.redirect('/');
    let checkRole = checkUser.roles.cache.get("878050906585825341");
    if(!checkRole) return res.redirect('/');
    res.render("botlist/premiumpanel.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/premium", async (req,res) => {
    res.render("botlist/premium.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/status", async (req,res) => {
    res.render("botlist/status.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/uneed2login", async (req,res) => {
    res.render("botlist/login.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/bot-rules", async (req,res) => {
    res.render("botlist/bot-rules.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/dc", async (req,res) => {
    res.redirect(global.config.server.invite)
})
app.get("/src", async (req,res) => {
    res.redirect(global.config.server.invite)
})
app.get("/vanity/:username", async (req,res) => {
    let botdata = await botsdata.findOne({
      vanity: req.params.username
    });
    res.redirect('https://vcodez.xyz/bot/'+botdata.botID)
})
app.get("/dsl", async (req,res) => {
    res.redirect(global.config.server.dblinvite)
})
app.get("/dbl", async (req,res) => {
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=876950142534688778&permissions=8&redirect_uri=https%3A%2F%2Fvcodez.xyz%2Fcallback&scope=bot')
})
app.get("/discord", async (req,res) => {
    res.redirect(global.config.server.dblinvite)
})

app.get("/robots.txt", function(req, res) {
    res.set('Content-Type', 'text/plain');
    res.send(`Sitemap: https://disbots.xyz/sitemap.xml`);
});

app.get("/sitemap.xml", async function(req, res) {
    let link = "<url><loc>https://disbots.xyz/</loc></url>";
    let botdataforxml = await botsdata.find()
    botdataforxml.forEach(bot => {
        link += "\n<url><loc>https://disbots.xyz/bot/" + bot.botID + "</loc></url>";
    })
    res.set('Content-Type', 'text/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1">${link}</urlset>`);
});

module.exports = app;