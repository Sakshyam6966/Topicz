
        module.exports = {
            bot: {
                token: process.env.BTOKEN, 
 // Bot List Bot Token
                prefix: "+",
                owners: ["729554449844011130", "745581095747059722"],
                mongourl: process.env.MONGO,
                servers: {
                    token: process.env.STOKEN, // Server List Bot Token
                    prefix: "+"
                }
            },
        
            website: {
                callback: process.env.CALLBACK, //Login Call Back, Example: https://vcodez.xyz/callback
                secret: process.env.SECRET, //Bot Secret Id.
                clientID: process.env.CLIENTID, // Bot client id.
                tags: [ "Moderation", "Fun", "Minecraft","Economy","Guard","NSFW","Anime","Invite","Music","Logging", "Web Dashboard", "Reddit", "Youtube", "Twitch", "Crypto", "Leveling", "Game", "Roleplay", "Utility", "Turkish" ],
                languages: [
                    { flag: 'gb', code: 'en', name: 'English' },
                    { flag: 'in', code: 'hi', name: 'हिंदी' },
                    { flag: 'in', code: 'te', name: 'తెలుగు' },
                    { flag: 'tr', code: 'tr', name: 'Türkçe' },
                    { flag: 'de', code: 'de', name: 'Deutsch' },
                    { flag: 'it', code: 'it', name: 'Italiano' },
                    { flag: 'ne', code: 'ne', name: 'नेपाली' },
                    { flag: 'ar', code: 'ar', name: 'العربية' },
                    { flag: 'fr', code: 'fr', name: 'French' },
                    { flag: 'pl', code: 'pl', name: 'Polish' }
                ],
                servers: {
                    tags: [
                    {
                        icon: "fal fa-code",
                        name: "Development"
                    },
                    {
                        icon: "fal fa-play",
                        name: "Stream"
                    },
                    {
                        icon: "fal fa-camera",
                        name: "Media"
                    },
                    {
                        icon: 'fal fa-building',
                        name: 'Company'
                    },
                    {
                        icon: 'fal fa-gamepad',
                        name: 'Game'
                    },
                    {
                        icon: 'fal fa-icons',
                        name: 'Emoji'
                    },
                    {
                        icon: 'fal fa-robot',
                        name: 'Bot List'
                    },
                    {
                        icon: 'fal fa-server',
                        name: 'Server List'
                    },
                    {
                        icon: 'fal fa-moon-stars',
                        name: 'Turkish'
                    },
                    {
                        icon: 'fab fa-discord',
                        name: 'Support'
                    },
                    {
                        icon: 'fal fa-volume',
                        name: 'Sound'
                    },
                    {
                        icon: 'fal fa-comments',
                        name: 'Chatting'
                    },
                    {
                        icon: 'fal fa-lips',
                        name: 'NSFW'
                    },
                    {
                      icon: "fal fa-comment-slash",
                      name: "Challange"
                    },
                    {
                      icon: "fal fa-hand-rock",
                      name: "Protest"
                    },
                    {
                      icon: "fal fa-headphones-alt",
                      name: "Roleplay"
                    },
                    {
                      icon: "fal fa-grin-alt",
                      name: "Meme"
                    },
                    {
                      icon: "fal fa-shopping-cart",
                      name: "Shop"
                    },
                    {
                      icon: "fal fa-desktop",
                      name: "Technology"
                    },
                    {
                      icon: "fal fa-laugh",
                      name: "Fun"
                    },
                    {
                      icon: "fal fa-share-alt",
                      name: "Social"
                    },
                    {
                      icon: "fal fa-laptop",
                      name: "E-Spor"
                    },
                    {
                      icon: 'fal fa-palette',
                      name: 'Design'
                    },
                    {
                      icon: 'fal fa-users',
                      name: 'Community'
                    }
                    ]                
                }
            },
        
            server: {
                id: "Server ID",
                invite: "Invite Link",
                dblinvite: "Bot Invite Link",
    roles: {
      yonetici: "",
      manager: "",
      booster: "",
      sponsor: "",
      community: "",
      supporter: "",
      partnerRole: "",
      site_creator: "",
      administrator: "",
      moderator: "",
      premiumuser: "",
      profile: {
        sitecreator:"",
        booster: "",
        community: "",
        sponsor: "",
        supporter: "",
        manager: "",
        partnerRole: ""
      },
      codeshare: {
        javascript: "JS",
        html: "HTML",
        substructure: "Substructure",
        bdfd: "BDFD", // Bot Designer For Discord
        fiveInvite: "5 INVITES",
        tenInvite: "10 INVITES",
        fifteenInvite: "15 INVITES",
        twentyInvite: "20 INVITES"
      },
      botlist: {
        ownerserver: "",
        developer: "",
        certified_developer: "",
        boosted_developer: "",
        promoted_developer: "",
        premium_developer: "", // premium server owner role id
        bot: "",
        boosted_bot: "",
        promoted_bot: "",
        certified_bot: ""
      }
    },
                channels: {
                    codelog: "",
                    login: "",
                    webstatus: "",
                    uptimelog: "",
                    botlog: "",
                    votes: "",
                    reportlog: ""
    }
  }


}
