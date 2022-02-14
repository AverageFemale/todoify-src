const {
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require('discord.js')
const Discord = require('discord.js')
const axios = require('axios')
module.exports.execute = async (interaction, client,paneldb,setupdb) => {
        var name = interaction.options.getString('name')
        var marker = interaction.options.getString('marker')
        var array = []
        var data = await client.db.get(`todo_${interaction.guild.id}_${paneldb.id}`)
        if (data != null) {
          for (var i = 0; i < data.length; i++) {
            array.push(data[i])
          }
        }
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
        for (var x = 0; x < array.length; x++) {
          if (name.toLowerCase() == array[x].name.toLowerCase()) {
            var newMarker = ''
            switch (marker) {
              case 'notDone':
                newMarker = client.config.emojis.notDone + ` | Marked by ${interaction.member.user.tag}`
                break
              case 'done':
                newMarker = client.config.emojis.done + ` | Marked by ${interaction.member.user.tag}`
                break
              case 'inProgress':
                newMarker = client.config.emojis.inProgress + ` | Marked by ${interaction.member.user.tag}`
                break
            }
            array[x].mark = newMarker
            access = true
          }
        }
        if (access) {
          await client.db.set(`todo_${interaction.guild.id}_${paneldb.id}`, array)
          embed.setDescription(`Changed the marker to \`${marker}\``)
          interaction.followUp({
            embeds: [embed]
          })
          client.emit('updateList', interaction,paneldb,setupdb)
          client.emit('logEvent', interaction, {
            event: 'mark',
            "name": name,
            mark: marker
          })
          return
        } else {
          embed.setDescription('You either didn\'t give the right name or that item already has that marker.')
          interaction.followUp({
            embeds: [embed]
          })
          return
        }

  
}