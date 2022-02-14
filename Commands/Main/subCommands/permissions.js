const {
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require('discord.js')
const Discord = require('discord.js')
const axios = require('axios')
module.exports.execute = async (interaction, client,paneldb,setupdb) => {
	const newPermission = interaction.options.getString('permission')
    const permissionDB = await client.db.get(`todo_${interaction.guild.id}_${paneldb.id}_permission`) || undefined
    var embed = new MessageEmbed().setTimestamp().setColor(client.config.embedColor);
    
    if (newPermission == permissionDB) {
        	embed.setDescription('This is already the set permission for this panel.')
        	return interaction.followUp({embeds: [embed]})
    }
    if (!Discord.Permissions.FLAGS[`${newPermission}`]) {
        embed.setDescription('You\'re trying to set a permission that isn\'t valid.')
        return interaction.followUp({embeds: [embed]})
    }
  embed.setDescription(`Successfully set the panel's permissions to \`${newPermission}\``)
  await client.db.set(`todo_${interaction.guild.id}_${paneldb.id}_permission`, newPermission)
  return interaction.followUp({embeds: [embed]})
}