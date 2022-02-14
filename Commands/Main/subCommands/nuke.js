const {
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require('discord.js')
const Discord = require('discord.js')
const axios = require('axios')
module.exports.execute = async (interaction, client,paneldb,setupdb) => {
var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
        var isVoted = await client.checkVote(interaction)
        if (!isVoted) {
          embed.setDescription('This is a vote feature!\nPlease `/vote` for Todoify on our top.gg page.')
          interaction.followUp({
            embeds: [embed]
          })
          return
        }

        var setupChannel = await interaction.guild.channels.fetch(paneldb.channel).then((x) => {
          return x
        }).catch((x) => {
          return false
        })
        var setupMessage = await setupChannel?.messages.fetch(paneldb.list).then((x) => {
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
        const db2 = await client.db.get(`todo_${interaction.guild.id}_${paneldb.id}`)
        if (!db2 || db2?.length < 0) {
          embed.setDescription('Your todo list is already empty. Try adding some things then try this again when you want.')
          interaction.followUp({
            embeds: [embed]
          })
          return
        }
        embed.setDescription('Your todo list has been wiped clean.')
        await client.db.delete(`todo_${interaction.guild.id}_${paneldb.id}`)
        interaction.followUp({
          embeds: [embed]
        })
        client.emit('updateList', interaction,paneldb,setupdb)
        client.emit('logEvent', interaction, {
          event: 'nuke'
        })
  
}