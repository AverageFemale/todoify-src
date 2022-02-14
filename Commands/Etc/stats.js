const { MessageEmbed, version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: "stats",
    description: "See whats going on under the hood.",
    owner: false,
    options: [],
    execute: async (interaction, client) => {
        
      await interaction.deferReply()
      const emojis = client.config.emojis
       const duration1 = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        let ccount = client.channels.cache.size;
        let scount = client.guilds.cache.size;
        let mcount = 0; 
client.guilds.cache.forEach((guild) => {
    mcount += guild.memberCount 

})
        const embed = new MessageEmbed()
            .setColor(client.config.embedColor)
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .addField(`${emojis.server}${emojis.dot}Servers`, `\`\`\`Total: ${scount} Servers\`\`\``, true)
            .addField(`${emojis.user}${emojis.dot}Users`, `\`\`\`Total: ${mcount} Users\`\`\``, true)
            .addField(`${emojis.channel}${emojis.dot}Channels`, `\`\`\`Total: ${ccount} Channels\`\`\``, true)
            .addField(`${emojis.node}${emojis.dot}Node Version`, `\`\`\`${process.version}\`\`\``, true)
            .addField(`${emojis.djs}${emojis.dot}Discord.js Version`, `\`\`\`${version}\`\`\``, true)
            .addField(`${emojis.uptime}${emojis.dot}Uptime`, `\`\`\`${duration1}\`\`\``, true)
            .addField(`${emojis.ping}${emojis.dot}Ping`, `\`\`\`${client.ws.ping}ms\`\`\``, true)
            .addField(`${emojis.todoify}${emojis.dot}Developers`, `\`\`\`Kweeme | 🍮#5748\n\nTesters:\nBIT#5180\`\`\``, true)
            
         return interaction.followUp({embeds: [embed]});
    }
}