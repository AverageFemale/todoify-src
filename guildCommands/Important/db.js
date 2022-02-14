const { MessageEmbed } = require("discord.js");
const { post } = require("node-superfetch");
const key = {
        name: 'key',
        required: true,
        type: 'STRING',
        autocomplete: true,
        description: 'Provide a key from the database'
      }
const json = {
        name: 'json',
        required: true,
        type: 'STRING',
        description: 'Provide json for the database'
      }

module.exports = {
    name: "db",
    default_permission: false,

    description: "Edit the database",
    owner: true,
    options: [{
      name: 'get',
      description: 'Get a key\'s json',
      type: 'SUB_COMMAND',
      options: [key]
    },{
      name: 'delete',
      description: 'Delete a key\'s json',
      type: 'SUB_COMMAND',
      options: [key]
    },{
      name: 'push',
      description: 'Push something to a key',
      type: 'SUB_COMMAND',
      options: [key,json]
    },{
      name: 'set',
      description: 'Set a key\'s json',
      type: 'SUB_COMMAND',
      options: [key,json]
    },{
      name: 'pull',
      description: 'Pull something from a key',
      type: 'SUB_COMMAND',
      options: [key,json]
    }],
    execute: async (interaction, client) => {
      interaction.deferReply({ephermal: true})
      const subCommand = interaction.options.getSubcommand()
      const embed = new MessageEmbed()
        .setColor(client.config.embedColor)
        .setTimestamp()
      switch(subCommand) {
        case 'get':
          var keyValue = interaction.options.getString('key')
          var results = await client.db.get(keyValue)
          if (!results) {
            results = 'This key has nothing on it'
          } else {
            results = JSON.stringify(results)
          }
          embed.setDescription(`${results}`)
          interaction.followUp({embeds: [embed]})
        break;


        case 'delete':
          keyValue = interaction.options.getString('key')
          results = await client.db.delete(keyValue)
          if (!results) {
            results = 'This key already has nothing on it.'
          } else {
            results = 'Deleted that key from the database.'
          }
          embed.setDescription(`${results}`)
          interaction.followUp({embeds: [embed]})
        break;


        case 'push':
          keyValue = interaction.options.getString('key')
          var jsonValue = interaction.options.getString('json')
          results = await client.db.push(keyValue, jsonValue)
          if (!results) {
            results = `An error has occured trying to push \`${jsonValue}\` to \`${keyValue}\``
          } else {
            results = `Successfully pushed \`${jsonValue}\` to \`${keyValue}\``
          }
          embed.setDescription(`${results}`)
          interaction.followUp({embeds: [embed]})
        break;

        
        case 'set':
          keyValue = interaction.options.getString('key')
          jsonValue = interaction.options.getString('json')
          results = await client.db.set(keyValue, jsonValue)
          if (!results) {
            results = `An error has occured trying to set \`${jsonValue}\` to \`${keyValue}\``
          } else {
            results = `Successfully set \`${jsonValue}\` to \`${keyValue}\``
          }
          embed.setDescription(`${results}`)
          interaction.followUp({embeds: [embed]})
        break;

        case 'pull':
          keyValue = interaction.options.getString('key')
          jsonValue = interaction.options.getString('json')
          results = await client.db.pull(keyValue, jsonValue)
          if (!results) {
            results = `An error has occured trying to pull \`${jsonValue}\` from \`${keyValue}\``
          } else {
            results = `Successfully pulled \`${jsonValue}\` from \`${keyValue}\``
          }
          embed.setDescription(`${results}`)
          interaction.followUp({embeds: [embed]})
        break;
      }
    }
}