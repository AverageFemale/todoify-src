//https://discord.com/api/oauth2/authorize?client_id=905523747887415327&permissions=536870911991&scope=bot%20applications.commands
const {MessageEmbed, MessageButton, MessageActionRow} = require('discord.js')
module.exports = {
  name: "invites",
  description: "Invite the bot or join or support server",
  owner: false,
  options: [],
  execute: async (interaction, client) => {
    await interaction.deferReply()
    const embed = new MessageEmbed()
      .setTitle('Bloop')
      .setDescription('Want to use Todoify? Click the button below this message to invite me.\n\nWanna become apart of the Todoify family? Come join our support server then.')
      .setColor(client.config.embedColor)
      .setFooter('Invite Message')
      .setTimestamp()
    const support = new MessageButton()
      .setLabel('Support Server')
      .setStyle('LINK')
      .setEmoji(client.config.emojis.server)
      .setURL(client.config.links.ss)
    const invite = new MessageButton()
      .setLabel('Invite Todoify')
      .setStyle('LINK')
      .setEmoji(client.config.emojis.todoify)
      .setURL(client.config.links.invite)
    const row = new MessageActionRow()
      .addComponents(invite,support)
    return interaction.followUp({embeds: [embed], components: [row]})
  }
}