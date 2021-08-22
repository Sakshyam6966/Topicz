/*=======================================================================================*/
const Discord = require("discord.js");
const { Client, Collection } = require("discord.js");
const client = (global.Client = new Client())
const config = require("./config.js");
global.config = config;
const fs = require("fs");
client.htmll = require('cheerio');
const request = require("request");
let botsdata = require("./src/database/models/botlist/bots.js");
let profiledata = require("./src/database/models/profile.js");
const db = require("quick.db");
const ms = require("parse-ms");



/*=======================================================================================*/

client.on('presenceUpdate', async(oldPresence, newPresence) => 
{
  
   var botdata = await botsdata.findOne({ botID: newPresence.userID });
      if(!botdata)
      {
        return
      }

    if(newPresence.guild.id == "878005928631336991")
    {
     if(botdata.status == "UnApproved")

     {
       return;
     }

  if (newPresence.status === 'offline') {
   
    var uptimerate = db.fetch(`rate_${newPresence.userID}`);
  
if(!uptimerate)
      {
             var uptimerate = "99";
             db.set(`rate_${newPresence.userID}`, 99)
      }
      
      var timetest = db.fetch(`timefr_${newPresence.userID}`)
      var timetest = Date.now() - timetest;
      let breh = db.fetch(`lastoffline`)
     
      if(timetest > 60000)
      {
      
         db.set(`presence_${newPresence.userID}`, "offline")
          db.set(`timefr_${newPresence.userID}`, Date.now())
       db.add(`offlinechecks_${newPresence.userID}`, 1)
        if(breh === newPresence.userID)
      {
        return;
      }
         
       client.channels.cache.get("878005928631336991").send(new Discord.MessageEmbed()
       .setTitle(`Bot Offline`).setThumbnail(newPresence.displayAvatarURL()).setDescription(`<@${newPresence.userID}> is Offline And Uptime Rate - ${uptimerate}%`)) 

      }
      
      
    
    
      
      
  }
  if (newPresence.status === 'online') {
    let check = db.fetch(`presence_${newPresence.userID}`);
    if(check === "offline")
    {

      var uptimerate = db.fetch(`rate_${newPresence.userID}`);
   
   if(!uptimerate)
      {
             var uptimerate = "99";
      }
        
        db.delete(`presence_${newPresence.userID}`, "online")
        
        let to2 = db.fetch(`timefr_${newPresence.userID}`);
        var timeleft = await ms(Date.now() - to2);
        var hour = timeleft.hours;
       var minutes = timeleft.minutes;
       var seconds = timeleft.seconds;
    
       db.set(`lastoffline`, newPresence.userID);
       client.channels.cache.get("878005928631336991").send(new Discord.MessageEmbed()
       .setTitle(`Bot Online`).setThumbnail(newPresence.displayAvatarURL()).setDescription(`<@${newPresence.userID}> is Online And Uptime Rate - ${uptimerate}% And was Offline for ${hour}h ${minutes}m ${seconds}s`)) 
       db.set(`timefr_${newPresence.userID}`, Date.now())
    }
    }
    
    }
    

})
/*=======================================================================================*/
require('events').EventEmitter.prototype._maxListeners = 100;
client.komutlar = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./src/commands", (err, files) => {
    if (err) console.error(err);
    console.log(`[disbots.xyz]: ${files.length} command loaded.`);
    files.forEach(f => {
        if (!f.endsWith('.js')) return
        let props = require(`./src/commands/${f}`);
        if (!props.help) return
        client.komutlar.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
            global.commands = files;
        });
    });
});
client.on('message', async message => {
    let p = config.bot.prefix
    let client = message.client;
    if (message.author.bot) return;
    if (!message.content.startsWith(p)) return;
    let command = message.content.split(" ")[0].slice(p.length);
    let params = message.content.split(" ").slice(1);
    let cmd
    if (client.komutlar.has(command)) {
        cmd = client.komutlar.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.komutlar.get(client.aliases.get(command));
    }
    if(cmd) {
        cmd.run(client, message, params, p);
    }
    if(!cmd) return;
})
/*=======================================================================================*/


/*=======================================================================================*/
const claudette = require("./src/database/models/uptime.js")
    setInterval(() => {
        claudette.find({}, function (err, docs) {
            if(err) console.log(err)
            if(!docs) return;
            docs.forEach(docs => {
                request(docs.link, async function(error, response, body) {
                  if(error) {
                    console.error(`${docs.link} has been deleted on uptime system.\nReason: Invalid domain so request failed.`);
                    await claudette.findOneAndDelete({ code: docs.code })
                  }
                });
            })
        })
    }, 60000)

client.on('guildMemberRemove', async member => {
    if(member.guild.id !== config.serverID) return
        claudette.find({ userID: member.id }, async function (err,docs) {
            await docs.forEach(async a => {
            await claudette.findOneAndDelete({ userID: member.id, code: a.code, server: a.server, link: a.link })
            })
        })
    })
/*=======================================================================================*/


/*=======================================================================================*/
const votes = require('./src/database/models/botlist/vote.js')
const votesServer = require('./src/database/models/servers/user.js')
client.on('ready', async () => {
        setInterval(async () => {
            let datalar = await votes.find()
            if(datalar.length > 0) {
            datalar.forEach(async a => {
                let süre = a.ms - (Date.now() - a.Date)
                if(süre > 0) return
                await votes.findOneAndDelete({ bot: a.bot, user: a.user })
            })
            }
        }, 1500000)
})
client.on('ready', async () => {
        setInterval(async () => {
            let voteServer = await votesServer.find()
            if(voteServer.length > 0) {
            voteServer.forEach(async a => {
                let süre = 1800000 - (Date.now() - a.date)
                if(süre > 0) return
                await votesServer.findOneAndDelete({ guild: a.guild, id: a.id, date: a.date })
            })
            }
        }, 300000)
})
/*=======================================================================================*/


/*=======================================================================================*/
client.on('guildMemberRemove', async member => {
    const botlar = require('./src/database/models/botlist/bots.js')
    const serverlar = require('./src/database/models/servers/server.js')
    let data = await botlar.findOne({ ownerID: member.id })
    let serverdata = await serverlar.findOne({ ownerID: member.id })
    if(!data) return
    let find = await botlar.find({ ownerID: member.id })
    await find.forEach(async b => {
        member.guild.members.cache.get(b.botID).kick();
        await botlar.deleteOne({ botID: b.botID })
    })
    client.guilds.fetch(config.server.id).then(bota => {
      client.channels.cache.get(config.server.channels.botlog).send(new Discord.MessageEmbed().setTitle(`Owner Left`).setDescription(`<:no:833101993668771842>  <@${data.ownerID}>'s bot **${bota.username}** has been kicked from server and deleted from website \nReason: Owner left server`))
    });
    if(!serverdata) return
    let serverfind = await serverdata.find({ ownerID: member.id })
    client.guilds.fetch(config.server.id).then(bota => {
      client.channels.cache.get(config.server.channels.botlog).send(new Discord.MessageEmbed().setTitle(`Owner Left`).setDescription(`<:no:833101993668771842>  <@${serverfind.ownerID}>'s server **${serverfind.name}** has been deleted from website \nReason: Owner left server`))
    });
    await serverfind.forEach(async b => {
        await serverfind.deleteOne({ id: b.id })
    });
})
client.on("guildMemberAdd", async (member) => {
  let guild = client.guilds.cache.get(config.server.id);
  if (member.user.bot) {
    try {
      guild.member(member.id).roles.add(config.server.roles.botlist.bot);
    } catch (error) {
      
    }
  }
});
/*=======================================================================================*/


/*
    SERVER LIST CLIENT 
*/
const serverClient = new Client();
serverClient.login(config.bot.servers.token);
global.clientSL = serverClient;
require("./src/servers/client.js");


/*=======================================================================================*/
require("./src/server.js")(client);
require("./src/database/connect.js")(client);

client.login(config.bot.token);
client.on('ready',async () => {
    console.log("[disbots.xyz]: Bot successfully connected as "+client.user.tag+".");
    let botsSchema = require("./src/database/models/botlist/bots.js");
    const bots = await botsSchema.find();
    client.user.setPresence({ activity: { type: 'WATCHING', name: '+help | '+bots.length+' bots' }, status: "online" });
});


let voiceStates = {}

client.on('voiceStateUpdate', async(oldState, newState) => {
  var { id } = oldState // This is the user's ID
  if (!oldState.channel) {
    console.log("user connected.");
    // The user has joined a voice channel
    voiceStates[id] = new Date()
  } else if (!newState.channel) {
    console.log("user disconnected.");
    var now = new Date()
    var joined = voiceStates[id] || new Date()
    var rewards = Math.floor(Math.random() * 10) + 1;
    // This will be the difference in milliseconds
    var dateDiff = now.getTime() - joined.getTime()
    if (dateDiff >= 600000) {
      console.log("Gave 1 coin to user as he is in more that 1 min in vc")
      var randomNumber = Math.floor(Math.random() * 10) + 1;
      var find = await profiledata.findOne({ userID: newState.member.id })
      if (!find.userID){
        await new profiledata({
           userID: newState.member.id, 
           coins: '0'
      })
      }
      let mycoins = find.coins
      if (find.coins) {
      await profiledata.findOneAndUpdate({
        userID: newState.member.id
    }, {
        $set: {
            coins: parseInt(mycoins)+5
        }
    }, function(err, docs) {})}
    if (!find.coins) {
      await profiledata.findOneAndUpdate({
        userID: newState.member.id
    }, {
        $set: {
            coins: '0'
        }
    }, function(err, docs) {})}
    client.channels.cache.get('878005930321657887').send(new Discord.MessageEmbed().setTitle(`Vcodez Coins`).setDescription(`Hey <@${newState.member.id}>, You have gained some **Vcodez Coins** for being active!`).setFooter(`Our coins system is still in beta, so sometimes it might work...`))
    }
  }
})

/*=======================================================================================*/

/* RESET DATA'S EVERY MONTHS */

// BOT/SERVER VOTES & ANALYTICS
const {
    CronJob
} = require('cron')
const botlar = require('./src/database/models/botlist/bots.js')
const servers = require('./src/database/models/servers/server.js')
client.on('ready', async () => {
    var resetStats = new CronJob('00 00 1 * *', async function() {
        let x = await botlar.find()
        await x.forEach(async a => {
            await botlar.findOneAndUpdate({
                botID: a.botID
            }, {
                $set: {
                    votes: 0,
                    analytics_invites: 0,
                    analytics_visitors: 0,
                    country: {},
                    analytics: {}
                }
            })
        })
        let sunucular = await servers.find()
        await sunucular.forEach(async a => {
            await servers.findOneAndUpdate({
                id: a.id
            }, {
                $set: {
                    votes: 0,
                    bumps: 0,
                    analytics_joins: 0,
                    analytics_visitors: 0,
                    country: {},
                    analytics: {}
                }
            })
        })
    }, null, true, 'Europe/Istanbul');
    resetStats.start();
})
