const {
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require('discord.js')
module.exports = async (client, interaction, info) => {
  const panelName = interaction.options.getString('panel')
  const event = info.event
  const user = interaction.member
  const db = await client.db.get(`log_${interaction.guild.id}`) ? await client.db.get(`log_${interaction.guild.id}`) : undefined
  if (!db) return
  const channel = await client.channels.fetch(db) ? await client.channels.fetch(db) : undefined
  if (!channel) {
    return interaction.member.send('Something went wrong when trying to send something to the logs... Can you have the server owner take a look at this?\n\nCheck if the channel was deleted or check if my permissions are correct.')
  }
  switch (event) {
  
    case 'add':
      var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
      var name = info.name
      embed.setTitle('A new item was added')
      .setDescription(`By: ${user}\n\nPanel: ${panelName}\n\nTodo Item Name: \`${name}\``)
      channel.send({embeds: [embed]})
    break



    case 'delete':
      var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
      var name = info.name
      embed.setTitle('An item was deleted')
      .setDescription(`By: ${user}\n\nPanel: ${panelName}\n\nTodo Item Name: \`${name}\``)
      channel.send({embeds: [embed]})
    break


    case 'mark':
      var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
      var name = info.name
      var mark = info.mark
      embed.setTitle('An item was marked')
      .setDescription(`By: ${user}\n\nPanel: ${panelName}\n\nTodo Item Name: \`${name}\`\n\nNew Marker: \`${mark}\``)
      channel.send({embeds: [embed]})
    break

    case 'edit':
      var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
      var name = info.name
      var newname = info.newname
      embed.setTitle('An items name was edited')
      .setDescription(`By: ${user}\n\nPanel: ${panelName}\n\nTodo Item Name: \`${name}\`\n\nNew Name: \`${newname}\``)
      channel.send({embeds: [embed]})
    break

    case 'nuke':
      var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
      embed.setTitle(`${panelName} was nuked`)
      .setDescription(`By: ${user}`)
      channel.send({embeds: [embed]})
    break

    case 'addmultiple':
      var addedArray = info.added
      var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
      embed.setTitle('Added multiple items')
      embed.setDescription(`By: ${user}\n\nPanel: ${panelName}`)
      addedArray.forEach(async (x) => {
        embed.addField(`${x}`, 'Added Item', true)
      })
      channel.send({embeds: [embed]})

    break
          
      case 'paneldelete':
      var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
      var name = info.name
      embed.setTitle('A panel was deleted')
      .setDescription(`By: ${user}\n\nPanel: ${panelName}`)
      channel.send({embeds: [embed]})
      break


  }

}