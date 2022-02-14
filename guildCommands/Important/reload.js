const { MessageEmbed } = require("discord.js");
const { post } = require("node-superfetch");
const {readdirSync} = require('fs')

module.exports = {
    name: "reload",
    description: "Reloads the slash commands",
    default_permission: false,
    owner: true,
    options: [],
    execute: async (interaction, client) => {
      interaction.deferReply()
        var data = [];
       
readdirSync(`${process.cwd()}/Commands/`).forEach((dir) => {
        const slashCommandFile = readdirSync(`${process.cwd()}/Commands/${dir}/`).filter((files) => files.endsWith(".js"));
    	
        for (const file of slashCommandFile) {
            delete require.cache[require.resolve(`${process.cwd()}/Commands/${dir}/${file}`)];
            const slashCommand = require(`${process.cwd()}/Commands/${dir}/${file}`);
			
            if(!slashCommand.name) return console.log2(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`, 'error');

            if(!slashCommand.description) return console.log2(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`, 'error');
            

            client.slashCommands.set(slashCommand.name, slashCommand);
            console.log2(`Client SlashCommands Command (/) Reloaded: ${slashCommand.name}`, "cmd");
            data.push(slashCommand);
        }
    });

    client.application.commands.set(data).then(() => {}).catch((e) => console.log(e));
    

            var data2 = [];
       
readdirSync(`${process.cwd()}/guildCommands/`).forEach((dir) => {
        const slashCommandFile = readdirSync(`${process.cwd()}/guildCommands/${dir}/`).filter((files) => files.endsWith(".js"));
    
        for (const file of slashCommandFile) {
            delete require.cache[require.resolve(`${process.cwd()}/guildCommands/${dir}/${file}`)];
            const slashCommand = require(`${process.cwd()}/guildCommands/${dir}/${file}`);

            if(!slashCommand.name) return console.log2(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`, 'error');

            if(!slashCommand.description) return console.log2(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`, 'error');
            

            client.slashCommands.set(slashCommand.name, slashCommand);
            console.log2(`Guild SlashCommands Command (/) Reloaded: ${slashCommand.name}`, "cmd");
            data2.push(slashCommand);
        }
    });
        
        
  const tSG = await client.guilds.fetch('905919731284967424')
    tSG.commands.set(data2).then((x) => {
      interaction.followUp(`Done reloading the slash commands including guild`)
      const jenArray = []
      x.each((jk) => {
        jenArray.push(
        {
          id: jk.id,
          permissions: [{
              id: '907381785757904908',
              type: 'ROLE',
              permission: true,
          }],
        })
    })
 
      
      tSG.commands.permissions.set({fullPermissions: jenArray}).then((l) => console.log2('Set the commands permissions','ready')).catch((r) => console.log(r))
      }).catch((e) => console.log(e));
    
    }
}