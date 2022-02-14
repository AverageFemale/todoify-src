const {
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require('discord.js')
const Discord = require('discord.js')
const axios = require('axios')
module.exports.execute = async (interaction, client,paneldb,setupdb) => {
  var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
            var dbLength = setupdb?.length
            var vote = await client.checkVote(interaction)
            if (dbLength >= 5 && vote == false) {
                embed.setDescription('You have reached the limit of 5 panels. If you want 5 more panels then /vote')
          interaction.followUp({
            embeds: [embed]
          })
          return
         }
          if (dbLength >= 10) {
            embed.setDescription('You have reached the limit of 10 panels. Use `/todo paneldelete` to make more space or use an existing one.')
            interaction.followUp({
              embeds: [embed]
            })
            return
          }
          

            var beforeName = interaction.options.getString('name')
            var name = interaction.options.getString('name').toLowerCase()
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
        var access = true
        if (setupdb) {
          setupdb?.forEach(async (x) => {
          if (x.name == name) {
            access = false
          }
        })
        }
        
        if (access) {
            const todoChannel = await interaction.guild.channels.create(`${name}-todo`, {
          reason: 'Made a todo list on the server.',
          topic: 'You can edit the name and location of this channel, just don\'t delete it'
        })
        embed
          .setTitle(`${beforeName} - Todo List`)
          .setDescription('Nothing here, try adding some items.')
          .setColor(client.config.embedColor)

        const message = await todoChannel.send({
          embeds: [embed]
        })
        var id = Math.random() * (9999999999 - 1000000000) + 1000000000
        client.db.push(`setup_${interaction.guild.id}`, {
          'name': beforeName,
          'channel': todoChannel.id,
          'list': message.id,
          'id': id
        })
        client.db.delete(`todo_${interaction.guild.id}_${id}`)
        var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
        embed.setDescription(`Your new todo list is here, <#${todoChannel.id}>\n\nYou can now use the other todo commands to use the todo list.`)
        interaction.followUp({
          embeds: [embed]
        })
        } else {
            embed.setDescription(`You already have a todo-list with this exact name.`)
          interaction.followUp({
            embeds: [embed]
          })
        }
    
}