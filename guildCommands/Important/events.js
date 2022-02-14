const { MessageEmbed } = require("discord.js");
const { post } = require("node-superfetch");
const {readdirSync} = require('fs')

module.exports = {
    name: "events",
    description: "Set the current scheduled events using set templates.",
    default_permission: false,
    owner: true,
    options: [],
    execute: async (interaction, client) => {
      interaction.deferReply()
        
    }
}