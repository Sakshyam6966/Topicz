const app = require('express').Router();
const client = global.Client;
const botsdata = require("../../database/models/botlist/bots.js");
const channels = global.config.server.channels,
      roles = global.config.server.roles;
const { registerFont } = require('canvas')

// Registering the font
registerFont('Montserrat-Regular.txt', { family:  "Verdana" });
console.log("[vcodes.xyz]: Api router loaded.");

app.get("/api", async (req, res) => {
    res.json({
        "Hello": "World",
        "Template By": "vcodes.xyz",
        "Author": "Claudette"
    });
});
app.get("/api/bots/:botID", async (req, res) => {
    const botinfo = await botsdata.findOne({
        botID: req.params.botID
    })
    if (!botinfo) return res.json({
        "error": "You entered invalid bot id."
    })
    res.json({
        avatar: botinfo.avatar,
        botID: botinfo.botID,
        username: botinfo.username,
        discrim: botinfo.discrim,
        shortDesc: botinfo.shortDesc,
        prefix: botinfo.prefix,
        votes: botinfo.votes,
        ownerID: botinfo.ownerID,
        owner: botinfo.ownerName,
        coowners: botinfo.coowners,
        tags: botinfo.tags,
        longDesc: botinfo.longDesc,
        certificate: botinfo.certificate,
        github: botinfo.github,
        support: botinfo.support,
        website: botinfo.website,
    });
});
app.get("/api/bots/check/:userID", async (req, res) => {
    let token = req.header('Authorization');
    if (!token) return res.json({
        "error": "You must enter a bot token."
    })
    if (!req.params.userID) return res.json({
        "error": "You must enter a user id."
    })
    const botdata = await botsdata.findOne({
        token: token
    })
    if (!botdata) return res.json({
        "error": "You entered an invalid bot token."
    })
    const vote = await voteSchema.findOne({
        bot: botdata.botID,
        user: req.params.userID
    })
    if (vote) {
        res.json({
            voted: true
        });
    } else {
        res.json({
            voted: false
        });
    }
});
app.post("/api/bots/stats", async (req, res) => {
    let token = req.header('Authorization');
    if (!token) return res.json({
        "error": "You must enter a bot token."
    })
    const botdata = await botsdata.findOne({
        token: token
    })
    if (!botdata) return res.json({
        "error": "You entered an invalid bot token."
    })
    if (botdata) {
        await botsdata.updateOne({
            botID: botdata.botID
        }, {
            $set: {
                serverCount: req.header('serverCount')
            }
        })
        if (req.header('shardCount')) {
            await botsdata.updateOne({
                botID: botdata.botID
            }, {
                $set: {
                    shardCount: req.header('shardCount')
                }
            })
        }
    }
});

app.post("/api/search", async (req, res) => {
    let key = req.body.key;
    if (key.length <= 0) return res.json({
        status: true,
        data: []
    });
    let bots = require("../../database/models/botlist/bots.js")
    let bot = await bots.find();
    let data = await bot.filter(d => d.status == "Approved" && d.username.toLowerCase().includes(key.toLowerCase())).sort((a,b) => b.votes - a.votes);
    res.json({
        status: true,
        data: data
    });
});
app.post("/api/search/servers", async (req, res) => {
    let key = req.body.key;
    if (key.length <= 0) return res.json({
        status: true,
        data: []
    });
    let servers = require("../../database/models/servers/server.js")
    let server = await servers.find();
    let data = await server.filter(d => global.clientSL.guilds.cache.get(d.id) && d.name.toLowerCase().includes(key.toLowerCase())).sort((a,b) => global.clientSL.guilds.cache.get(b).memberCount - global.clientSL.guilds.cache.get(a).memberCount);
    res.json({
        status: true,
        data: data
    });
});
app.get("/api/bot/:botID/widget", async (req,res) => {
    console.log("Widget")
    const { Canvas, resolveImage } = require("canvas-constructor");

    const bots = await botsdata.findOne({ botID: req.params.botID })
    if(!bots) return res.json({ error: true, message: "This bot id not a function", errorcode: 404});
    res.header("Content-Type",'application/json');
    
    try {
    const owner = client.users.cache.get(bots.ownerID)

   let geting = client.users.cache.get(req.params.botID);
    var forav = geting.displayAvatarURL();
    var forav = forav.replace(".webp", ".png")
   let avatar = await resolveImage(forav);
 const imagem = await resolveImage('https://media.discordapp.net/attachments/878158835049717780/878168259311067147/UPCORD.XYZ.png');

    let img = new Canvas(500, 250)
      .printImage(imagem, 0, 0, 500, 250)
      .setColor("#141517")
      //.printRectangle(0, 0, 500, 250)
      .setColor("#FFFFFF")
      .setTextFont('bold 35px Verdana')
      .printText(bots.username, 120, 75)
      .printRoundedImage(avatar, 30, 30, 70, 70, 20)
      .setTextAlign("left")
      .setTextFont('bold 12px Verdana') //Verdana
     
      img.printText(`${bots.serverCount || "N/A"} guilds | ${bots.votes || 0} votes`, 30, 125)
      img.setTextFont('bold 12px Verdana')
    
    
    img
      .printText(`Prefix: ${bots.prefix}`, 30, 145)
      .setTextFont('normal 15px Verdana') //Verdana
      .printWrappedText(bots.shortDesc, 30, 175, 440, 15)
      .setTextFont('bold 12px Verdana')
      .printRectangle(15, 245)
      //.printText(bots.ownerName, 10, 245)
      //.setTextAlign("right")
      //.printText("dbots.ml", 490, 245)
      //.printRoundedImage(avatar2, 490, 245)

    res.writeHead(200, {
      "Content-Type": "image/png"
    });
    res.end(await img.toBuffer(), "binary");
  } catch (e) {
    throw e
    res.sendStatus(500);
  }
  })
app.get("/api/bot/:botID/widget/light", async (req,res) => {
    console.log("Widget")
    const { Canvas, resolveImage } = require("canvas-constructor");

    const bots = await botsdata.findOne({ botID: req.params.botID })
    if(!bots) return res.json({ error: true, message: "This bot id not a function", errorcode: 404});
    res.header("Content-Type",'application/json');
    
    try {
    const owner = client.users.cache.get(bots.ownerID)

   let geting = client.users.cache.get(req.params.botID);
    var forav = geting.displayAvatarURL();
    var forav = forav.replace(".webp", ".png")
   let avatar = await resolveImage(forav);
 const imagem = await resolveImage('https://cdn.discordapp.com/attachments/849129280268140544/878438823305052180/UPCORD.XYZ_1.png');

    let img = new Canvas(500, 250)
      .printImage(imagem, 0, 0, 500, 250)
      .setColor("#141517")
      //.printRectangle(0, 0, 500, 250)
      .setColor("#FFFFFF")
      .setTextFont('bold 35px Verdana')
      .printText(bots.username, 120, 75)
      .printRoundedImage(avatar, 30, 30, 70, 70, 20)
      .setTextAlign("left")
      .setTextFont('bold 12px Verdana') //Verdana
     
      img.printText(`${bots.serverCount || "N/A"} guilds | ${bots.votes || 0} votes`, 30, 125)
      img.setTextFont('bold 12px Verdana')
    
    
    img
      .printText(`Prefix: ${bots.prefix}`, 30, 145)
      .setTextFont('normal 15px Verdana') //Verdana
      .printWrappedText(bots.shortDesc, 30, 175, 440, 15)
      .setTextFont('bold 12px Verdana')
      .printRectangle(15, 245)
      //.printText(bots.ownerName, 10, 245)
      //.setTextAlign("right")
      //.printText("dbots.ml", 490, 245)
      //.printRoundedImage(avatar2, 490, 245)

    res.writeHead(200, {
      "Content-Type": "image/png"
    });
    res.end(await img.toBuffer(), "binary");
  } catch (e) {
    throw e
    res.sendStatus(500);
  }
  })
app.get("/api/bot/:botID/widget/blue", async (req,res) => {
    console.log("Widget")
    const { Canvas, resolveImage } = require("canvas-constructor");

    const bots = await botsdata.findOne({ botID: req.params.botID })
    if(!bots) return res.json({ error: true, message: "This bot id not a function", errorcode: 404});
    res.header("Content-Type",'application/json');
    
    try {
    const owner = client.users.cache.get(bots.ownerID)

   let geting = client.users.cache.get(req.params.botID);
    var forav = geting.displayAvatarURL();
    var forav = forav.replace(".webp", ".png")
   let avatar = await resolveImage(forav);
 const imagem = await resolveImage('https://cdn.discordapp.com/attachments/849129280268140544/878438824722702386/UPCORD.XYZ_2.png');

    let img = new Canvas(500, 250)
      .printImage(imagem, 0, 0, 500, 250)
      .setColor("#141517")
      //.printRectangle(0, 0, 500, 250)
      .setColor("#FFFFFF")
      .setTextFont('bold 35px Verdana')
      .printText(bots.username, 120, 75)
      .printRoundedImage(avatar, 30, 30, 70, 70, 20)
      .setTextAlign("left")
      .setTextFont('bold 12px Verdana') //Verdana
     
      img.printText(`${bots.serverCount || "N/A"} guilds | ${bots.votes || 0} votes`, 30, 125)
      img.setTextFont('bold 12px Verdana')
    
    
    img
      .printText(`Prefix: ${bots.prefix}`, 30, 145)
      .setTextFont('normal 15px Verdana') //Verdana
      .printWrappedText(bots.shortDesc, 30, 175, 440, 15)
      .setTextFont('bold 12px Verdana')
      .printRectangle(15, 245)
      //.printText(bots.ownerName, 10, 245)
      //.setTextAlign("right")
      //.printText("dbots.ml", 490, 245)
      //.printRoundedImage(avatar2, 490, 245)

    res.writeHead(200, {
      "Content-Type": "image/png"
    });
    res.end(await img.toBuffer(), "binary");
  } catch (e) {
    throw e
    res.sendStatus(500);
  }
  })



module.exports = app;
