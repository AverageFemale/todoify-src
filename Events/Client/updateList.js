
module.exports = async (client, interaction, paneldb, setupdb) => {
      var array = []
    var data = await client.db.get(`todo_${interaction.guild.id}_${paneldb.id}`)
    if (data != null) {
    for (var i = 0; i < data.length; i++) {
        array.push(data[i])
    }
    }
    
    const channel = await interaction.guild.channels.fetch(paneldb.channel)
    const message = await channel.messages.fetch(paneldb.list)
    var items = ''
        for (var i = 0; i < array.length; i++) {
        
        items = items + `**${array[i].name}**\nStatus: ${array[i].mark}\n\n`
    }
    if (array.length == 0) {
      items = 'Nothing here, try adding some items.'
    }
    const embed = new client.discord.MessageEmbed()
          .setTitle(`${paneldb?.name} - Todo List`)
          .setDescription(`${items}`)
          .setColor(client.config.embedColor)
          message.edit({embeds: [embed]}).then(() => {}).catch(async (x) => {if (x.code == 50001) {
                const embed = new client.discord.MessageEmbed()
                      .setTitle(`Oh no!`)
                      .setDescription(`It seems like I couldn't update your list.\n\nReason: Missing Access\n\nHow to fix: Try messing around with my permissions or give me administrator.`)
                      .setColor(client.config.embedColor)
              interaction.member.send({embeds: [embed]})
          }})
}