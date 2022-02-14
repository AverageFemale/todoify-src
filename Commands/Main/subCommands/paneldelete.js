const {
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require('discord.js')
const Discord = require('discord.js')
const axios = require('axios')
module.exports.execute = async (interaction, client,paneldb,setupdb) => {
    var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
var array = []
	if (!paneldb) {
        interaction.followUp('It seems that you inputted an invalid name, or I failed to load the panel from my database.')
    }
        var data = await client.db.get(`setup_${interaction?.guild?.id}`)
        if (data != null) {
          for (var i = 0; i < data.length; i++) {
            array.push(data[i])
          }
        }
        
        
        var access = false
        for (var i = 0; i < array.length; i++) {
          if (paneldb?.name?.toLowerCase() == array[i].name.toLowerCase()) {

            access = true
            array.splice(i, 1)
          }
        }
        if (access) {
          await client.db.set(`setup_${interaction.guild.id}`, array)
            
          embed.setDescription(`Deleted \`${paneldb.name}\` from your server. You can now delete the channel.`)
          interaction.followUp({
            embeds: [embed]
          })
          client.emit('updateList', interaction, paneldb, setupdb)
          client.emit('logEvent', interaction, {
            event: 'paneldelete'
          })
        } else {
          embed.setDescription('Invalid todo panel, try again with the correct name.')
          interaction.followUp({
            embeds: [embed]
          })
        }

  
}