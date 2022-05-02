const axios = require('axios')
const { version } = require('discord.js')
module.exports = async (client) => {
    console.log2(`D.JS Version: ${version}`, 'ready')
    console.log2(`NodeJS Version: ${process.version}`, 'ready')
    console.log2(`Signed in as ${client.user.tag}`, 'ready')
    

        
    setInterval(async function() {
        let statuses = [{name: 'for /invites', type: 'WATCHING'}, {name: `${client.guilds.cache.size} servers`, type: 'WATCHING'}];
  		let status = statuses[Math.floor(Math.random()*statuses.length)];
  		client.user.setActivity(status.name, {type: status.type, url: 'https://twitch.tv/twitch'});
  	}, 10000)
    
   
}
