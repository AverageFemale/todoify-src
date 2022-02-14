const { MessageEmbed, Collection } = require('discord.js')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const { Database } = require("quickmongo");
const axios = require('axios')
require('dotenv').config()
const client = new Discord.Client({intents: new Discord.Intents(32767), ws: { properties: { $browser: "Discord iOS" }} })
module.exports = client;
client.config = require('./config.js')
client.owner = '245650621745594379'
client.discord = Discord
client.checkVote = async (interaction) => {
      return await axios.get(`https://top.gg/api/bots/${client.user.id}/check?userId=${interaction.member.user.id}`, {
        headers: {
          'Authorization': process.env['topggToken']
        }
      }).then((x) => {
          var number = x.data.voted
			if (number == 1) {
                return true
            } else {
                return false
            }
      }).catch((g) => console.log(g))
    }
console.log2 = require('./Utils/logger.js').log
client.db = new Database(client.config.mongourl)
client.slashCommands = new Collection()
require('./Handler/startup.js').run(client)
client.login(process.env['TOKEN'])

