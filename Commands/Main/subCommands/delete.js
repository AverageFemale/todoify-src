const {
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require('discord.js')
const Discord = require('discord.js')
const axios = require('axios')
module.exports.execute = async (interaction, client,paneldb,setupdb) => {
var array = []
        var data = await client.db.get(`todo_${interaction.guild.id}_${paneldb.id}`)
        if (data != null) {
          for (var i = 0; i < data.length; i++) {
            array.push(data[i])
          }
        }
        var name = interaction.options.getString('name')

        var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
        var setupChannel = await interaction.guild.channels.fetch(paneldb.channel).then((x) => {
          return x
        }).catch((x) => {
          return false
        })
        var setupMessage = await setupChannel?.messages?.fetch(paneldb?.list).then((x) => {
          return x
        }).catch((x) => {
          return false
        })
        if (!paneldb.name || !setupChannel || !setupMessage) {

          embed.setDescription(`This panel doesn't exist, add it or try again. If this problem continues then please contact our support team.`)
          interaction.followUp({
            embeds: [embed]
          })
          return;
        }
        var access = false
        for (var i = 0; i < array.length; i++) {
          if (name.toLowerCase() == array[i].name.toLowerCase()) {

            access = true
            array.splice(i, 1)
          }
        }
        if (access) {
          await client.db.set(`todo_${interaction.guild.id}_${paneldb.id}`, array)
          embed.setDescription(`Deleted \`${name}\` from the todo list`)
          interaction.followUp({
            embeds: [embed]
          })
          client.emit('updateList', interaction, paneldb, setupdb)
          client.emit('logEvent', interaction, {
            event: 'delete',
            "name": name
          })
        } else {
          embed.setDescription('Invalid todo item, try again with the correct name.')
          interaction.followUp({
            embeds: [embed]
          })
        }

  
}