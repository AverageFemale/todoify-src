const { MessageEmbed } = require("discord.js");
const { post } = require("node-superfetch");
const {readdirSync} = require('fs')

module.exports = {
    name: "exereload",
    description: "Reloads the execution of the slash commands. This prevents ratelimit of /reload",
    default_permission: false,
    owner: true,
    options: [],
    execute: async (interaction, client) => {
      interaction.deferReply()
       
readdirSync(`${process.cwd()}/Commands/`).forEach((dir) => {
        const slashCommandFile = readdirSync(`${process.cwd()}/Commands/${dir}/`).filter((files) => files.endsWith(".js"));
    	
        for (const file of slashCommandFile) {
            delete require.cache[require.resolve(`${process.cwd()}/Commands/${dir}/${file}`)];
            
            const slashCommand = require(`${process.cwd()}/Commands/${dir}/${file}`);
			
            if(!slashCommand.name) return console.log2(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`, 'error');

            if(!slashCommand.description) return console.log2(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`, 'error');
            

            client.slashCommands.set(slashCommand.name, slashCommand);
            console.log2(`Client SlashCommands Command (/) Reloaded: ${slashCommand.name}`, "cmd");
        }
    });
    
       
readdirSync(`${process.cwd()}/guildCommands/`).forEach((dir) => {
        const slashCommandFile = readdirSync(`${process.cwd()}/guildCommands/${dir}/`).filter((files) => files.endsWith(".js"));
    
        for (const file of slashCommandFile) {
            delete require.cache[require.resolve(`${process.cwd()}/guildCommands/${dir}/${file}`)];
            
            const slashCommand = require(`${process.cwd()}/guildCommands/${dir}/${file}`);

            if(!slashCommand.name) return console.log2(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`, 'error');

            if(!slashCommand.description) return console.log2(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`, 'error');
            

            client.slashCommands.set(slashCommand.name, slashCommand);
            console.log2(`Guild SlashCommands Command (/) Reloaded: ${slashCommand.name}`, "cmd");
        }
    });
     interaction.followUp({content: 'Guild/Normal commands have had their execution reloaded.'})
     console.log2('Guild/Normal commands have had their execution reloaded.','ready')
    
    }
}