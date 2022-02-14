const {
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require('discord.js')
const Discord = require('discord.js')
const axios = require('axios')
module.exports.execute = async (interaction, client,paneldb,setupdb) => {
var name = interaction.options.getString('name')
const guild = await interaction.guild
        var newname = interaction.options.getString('newname')
        var array = []
        var data = await client.db.get(`todo_${guild.id}_${paneldb.id}`)
        if (data != null) {
          for (var i = 0; i < data.length; i++) {
            array.push(data[i])
          }
        }
        if (array.includes(newname)) {
          var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
          embed.setDescription('This item name already exists, choose something else.')
          return interaction.followUp({
            embeds: [embed]
          })
        }
        var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
        var setupChannel = await interaction.guild.channels.fetch(paneldb?.channel).then((x) => {
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
        for (var x = 0; x < array.length; x++) {
          if (name.toLowerCase() == array[x].name.toLowerCase()) {
            array[x].name = newname
            access = true
          }
        }
        if (access) {
          await client.db.set(`todo_${guild.id}_${paneldb.id}`, array)
          embed.setDescription(`Changed \`${name}\` to \`${newname}\``)
          interaction.followUp({
            embeds: [embed]
          })
          client.emit('updateList', interaction,paneldb,setupdb)
          client.emit('logEvent', interaction, {
            event: 'edit',
            "name": name,
            'newname': newname
          })
          return
        } else {
          embed.setDescription(`\`${name}\`, is not a name. If this is an error then join our support server using /invites`)
          interaction.followUp({
            embeds: [embed]
          })
          return
        }
  
}