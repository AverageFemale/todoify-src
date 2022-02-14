const {
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require('discord.js')
const Discord = require('discord.js')
const axios = require('axios')
module.exports.execute = async (interaction, client,paneldb,setupdb) => {
var todoArray = []
        var data = await client.db.get(`todo_${interaction?.guild?.id}_${paneldb?.id}`)
        if (data != null) {
          for (var i = 0; i < data.length; i++) {
            todoArray.push(data[i])
          }
        }
        var one = interaction.options.getString('1') ? interaction.options.getString('1') : undefined
        var two = interaction.options.getString('2') ? interaction.options.getString('2') : undefined
        var three = interaction.options.getString('3') ? interaction.options.getString('3') : undefined
        var four = interaction.options.getString('4') ? interaction.options.getString('4') : undefined
        var five = interaction.options.getString('5') ? interaction.options.getString('5') : undefined
        var six = interaction.options.getString('6') ? interaction.options.getString('6') : undefined
        var seven = interaction.options.getString('7') ? interaction.options.getString('7') : undefined
        var eight = interaction.options.getString('8') ? interaction.options.getString('8') : undefined
        var nine = interaction.options.getString('9') ? interaction.options.getString('9') : undefined
        var ten = interaction.options.getString('10') ? interaction.options.getString('10') : undefined
        var optionArray = [one, two, three, four, five, six, seven, eight, nine, ten]
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
        if (!paneldb.name ||!setupChannel || !setupMessage) {

          embed.setDescription(`This panel doesn't exist, add it or try again. If this problem continues then please contact our support team.`)
          interaction.followUp({
            embeds: [embed]
          })
          return;
        }

        var array = []
        optionArray.forEach(async (x) => {
          if (x) {
            array.push(x)
          }
        })
        var addedArray = []
        var time = 0
        await array.forEach(async (x) => {
          var access = true
          await todoArray.forEach(async (d) => {
            if (x.toLowerCase() == d.name.toLowerCase()) {

              access = false
              return
            }
          })
          if (access) {
            time++
            addedArray.push(x)
            await setTimeout(async function() {
              await client.db.push(`todo_${interaction.guild.id}_${paneldb.id}`, {
              'name': x,
              'mark': client.config.emojis.notDone
            }).then(() => {
              
            })
            }, parseInt(`${time}000`))
            

          }

        })
        embed.setDescription('Here are the things that got added, if any of your other things weren\'t added then it probably already exists. \n\nWait 10 seconds for the changes to take effect.')
        
        addedArray.forEach(async (x) => {
          embed.addField(`${x}`, 'Added Item', true)
        })
        setTimeout(async () => {
          client.emit('updateList', interaction,paneldb,setupdb)
        },10000)
        interaction.followUp({
          embeds: [embed]
        })
        client.emit('logEvent', interaction, {
          event: 'addmultiple',
          added: addedArray
        })
        

  
}