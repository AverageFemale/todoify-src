const {MessageEmbed, MessageButton, MessageActionRow} = require('discord.js')
const axios = require('axios')
module.exports = {
  name: "vote",
  description: "Vote for Todoify on Top.gg",
  owner: false,
  options: [],
  execute: async (interaction, client) => {
    await interaction.deferReply()
    async function checkVote() {
      return await axios.get(`https://top.gg/api/bots/${client.user.id}/check?userId=${interaction.member.user.id}`, {
        headers: {
          'Authorization': process.env['topggToken']
        }
      }).then((x) => {
          if (x.data.voted == 0) {
              return false
          } else {
              return true
          }
          return 'Incorrect Thing'
      }).catch((g) => console.log(g))
    }
    const voter = await checkVote()
    const embed = new MessageEmbed()
      .setTitle('Bloop')
      .setDescription(`Has voted: ${voter}\n\nWant to unlock more features? Click the button below this message to vote for me.\n\nRight now the only things that are unlockable are \n\`/todo nuke\`\n\`/todo addmultiple\`\n\`5 more panels!\`\nMore coming soon!`)
      .setColor(client.config.embedColor)
      .setFooter('Vote Message')
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
    const vote = new MessageButton()
      .setLabel('Vote for Todoify')
      .setStyle('LINK')
      .setEmoji(client.config.emojis.topgg)
      .setURL(client.config.links.topgg + '/vote')
    const row = new MessageActionRow()
      .addComponents(vote,invite,support)
    return interaction.followUp({embeds: [embed], components: [row]})
  }
}