const {MessageEmbed, MessageButton, MessageActionRow, Permissions} = require('discord.js')
module.exports = {
  name: "logs",
  description: "This will have the bot send all actions that are done, to your log channel.",
  owner: false,
  options: [{
    name: 'channel',
    type: 'CHANNEL',
    required: true,
    description: 'Provide a valid channel for the logs.'
  },{
    name: 'toggle',
    type: 'BOOLEAN',
    required: true,
    description: 'Do you want this option on or off?'
  }],
  execute: async (interaction, client) => {
    await interaction.deferReply()
    const toggle = interaction.options.getBoolean('toggle')
    if (!interaction?.member?.permissions?.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      const embed = new MessageEmbed()
        .setTimestamp()
        .setColor(client.config.embedColor)
        .setDescription('You do not have the right permissions to use this command. (MANAGE_CHANNELS)')
      return interaction.followUp({embeds: [embed]})
    }
    if (toggle) {
      const channel = interaction.options.getChannel('channel')
      await client.db.set(`log_${interaction.guild.id}`, channel.id)
      const embed = new MessageEmbed()
        .setTimestamp()
        .setColor(client.config.embedColor)
        .setDescription(`Your logs channel has been set to: ${channel}`)
      interaction.followUp({embeds: [embed]})
    } else {
      const db = await client.db.get(`log_${interaction.guild.id}`) ? await client.db.get(`log_${interaction.guild.id}`) : false

      if (db) {
        client.db.delete(`log_${interaction.guild.id}`)
        const embed = new MessageEmbed()
          .setTimestamp()
          .setColor(client.config.embedColor)
          .setDescription(`Your logs channel has been turned off.`)
        interaction.followUp({embeds: [embed]}) 
      } else {
        const embed = new MessageEmbed()
          .setTimestamp()
          .setColor(client.config.embedColor)
          .setDescription(`You currently don't have a logs channel so this is by default off.`)
      }
    }
    

  }
}