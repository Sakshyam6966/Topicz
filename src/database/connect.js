const config = require("../../config.js");
const mongoose = require("mongoose")

module.exports = async () => {
    mongoose.connect(config.bot.mongourl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false
    }).then(() => {
    console.log("[vcodez.xyz]: Mongoose successfully connected.");
    }).catch(err => console.log("[vcodez.xyz]: An error occurred while connecting mongoose.", err));
}
