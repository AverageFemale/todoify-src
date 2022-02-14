const { MessageEmbed} = require("discord.js")
module.exports = async (client, interaction) => {
const guild = await interaction.guild

 let color = client.embedColor;
  if (interaction.isAutocomplete()) {
	
    const focusedObject = await interaction.options.getFocused({getFull: true})
    const value = focusedObject.value.toLowerCase()
    const type = focusedObject.type
    const option = focusedObject.name
    const dbArray = []
    client.guilds.cache.each(async (x) => {
      dbArray.push({
        "id": x.id,
        "name": x.name
      })
    })
    if (interaction.commandName == 'db') {
      
       if (interaction.member.id == client.owner) {
         const newArray = []
         dbArray.forEach(async (x) => {
           if (value.startsWith(x.name.toLowerCase().substr(0, value.length))) {
             if (newArray.length == 24) return;     
             newArray.push({
               name: `setup | ${x.name}`,
               value: `setup_${x.id}`
             })   
             }
         })
           if (newArray.length == 0) {
             console.log('hi')
            await interaction.respond([{
              name: 'your search came up with nothing or there was an error.',
              value: 'invalid'
            }])
         } else {
          await interaction.respond(newArray)
         }
           
         
         
          
       } else {
         await interaction.respond([
           {
             name: 'You\'re not supposed to be here..',
             value: 'Invalid User'
           }
         ])
       }
    }
  if (interaction.commandName == 'todo') {
    if (option == 'name') {
       var array = []
    var data = await client.db.get(`todo_${guild.id}_${interaction.options.getString('panel')}`)
    if (data != null) {
      data.forEach((x) => {
        if (value.startsWith(x.name.toLowerCase().substr(0, value.length))) {
          if (array.length == 24) return;
         array.push({
               name: `${x.name}`,
               value: `${x.name}`
             })
        }
      })
    }
    if (array.length == 0) {
      await interaction.respond([{
        name: 'You do not have any items on your todo list or your search came up with nothing.',
        value: 'invalid'
      }])
    } else {
      await interaction.respond(array)
    }
      
    }
    if (option == 'panel') {
        var todoPanel = await client.db.get(`setup_${guild.id}`) || false
        var interactionResponses = []
        if (todoPanel != false) {
          todoPanel.forEach(async (x) => {
            interactionResponses.push({
                name: `${x.name}`,
                value: `${x.id}`
            })
          })
        }
        
        if (interactionResponses.length == 0) {
             await interaction.respond([{
                name: 'No panels were detected. Try adding one using /todo setup',
                value: 'invalid'
            }])
        }
         await interaction.respond(interactionResponses)
    }

  }
    
  }
     if(interaction.isCommand()) {

        const SlashCommands = client.slashCommands.get(interaction.commandName);
        if(!SlashCommands) return;
        if (SlashCommands.owner && interaction.member.id !== `${client.owner}`) {
          return await interaction.reply({
          content: `Only <@${client.owner}> can use this command!`
        }).catch(() => {});
        }
                
        try {
            await SlashCommands.execute(interaction, client);
        } catch (error) {
            if(interaction.replied) {
                await interaction.editReply({
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            } else {
                await interaction.followUp({
                    ephemeral: true,
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            }
            console.error(error);
        };
    } else return;
        
}

