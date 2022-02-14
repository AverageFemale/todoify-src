const mongoose = require('mongoose')
const {readdirSync} = require('fs')
module.exports.run = async (client) => {
  const dbOptions = {
      useNewUrlParser: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
      useUnifiedTopology: true,
    };
      mongoose.connect(client.config.mongourl, dbOptions);
      mongoose.set("useFindAndModify", false);
      mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => {
            console.log2('Mongo connected!', "ready");
            });
        mongoose.connection.on('err', (err) => {
                console.log2(`Mongo connection error: \n ${err.stack}`, "error");
            });
        mongoose.connection.on('disconnected', () => {
               console.log2('Mongo disconnected', 'error');
            });

            client.on("disconnect", () => console.log2("Bot is disconnecting...", 'log'))
    client.on("reconnecting", () => console.log2("Bot reconnecting...", 'log'))
    client.on('warn', error => console.log(error, 'warn'));
    client.on('error', error => console.log(error, 'error'));
    process.on('unhandledRejection', error => console.log(error, 'error'));
    process.on('uncaughtException', error => console.log(error, 'error'));

            readdirSync("./Events/Client/").forEach(file => {
        const event = require(`../Events/Client/${file}`);
        let eventName = file.split(".")[0];
        console.log2(`Loading Events Client ${eventName}`, "event");
        client.on(eventName, event.bind(null, client));
    });

     var data = [];
       
readdirSync("./Commands/").forEach((dir) => {
        const slashCommandFile = readdirSync(`./Commands/${dir}/`).filter((files) => files.endsWith(".js"));
    
        for (const file of slashCommandFile) {
            const slashCommand = require(`../Commands/${dir}/${file}`);

            if(!slashCommand.name) return console.log2(`slashCommandNameError: ${slashCommand} application command name is required.`, 'error');

            if(!slashCommand.description) return console.log2(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`, 'error');
            

            client.slashCommands.set(slashCommand.name, slashCommand);
            console.log2(`Client SlashCommands Command (/) Loaded: ${slashCommand.name}`, "cmd");
            data.push(slashCommand);
        }
    });

var data2 = [];
       
readdirSync("./guildCommands/").forEach((dir) => {
        const slashCommandFile = readdirSync(`./guildCommands/${dir}/`).filter((files) => files.endsWith(".js"));
    
        for (const file of slashCommandFile) {
            const slashCommand = require(`../guildCommands/${dir}/${file}`);

            if(!slashCommand.name) return console.log2(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`, 'error');

            if(!slashCommand.description) return console.log2(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`, 'error');
            

            client.slashCommands.set(slashCommand.name, slashCommand);
            console.log2(`Guild SlashCommands Command (/) Loaded: ${slashCommand.name}`, "cmd");
            data2.push(slashCommand);
        }
    });

    client.on("ready", async () => {
      const alreadyCommands = await client.application.commands.fetch()
      alreadyCommands.each(async (a) => {
        data.forEach(async (d) => {
          
          if (a.name == d.name) {
 if (a.description == d.description && a.options == d.options) {
            return
            
          } else if (!d.options) {
            return console.log2(`${d.name} doesn't have an options`,'error')
          }
        if (a.description == d.description && a.options.length != d.options.length) {
          
          return await client.application.commands.edit(a.id, d).then(() => console.log2(`Client SlashCommand (/): ${d.name} Edited.`, "ready")).catch((e) => console.log(e));
        } else if (a.description != d.description && a.options.length == d.options.length) {
          return await client.application.commands.edit(a.id, d).then(() => console.log2(`Client SlashCommand (/): ${d.name} Edited.`, "ready")).catch((e) => console.log(e));
        } else if (a.description != d.description && a.options.length != d.options.length) {
          return await client.application.commands.edit(a.id, d).then(() => console.log2(`Client SlashCommand (/): ${d.name} Edited.`, "ready")).catch((e) => console.log(e));
        }
        
          } else {            
            
            if (!alreadyCommands.find(flee => flee.name == d.name)) {
              
              return await client.application.commands.create(d).then(() => console.log2(`Client SlashCommand (/): ${d.name} Created.`, "ready")).catch((e) => console.log(e));
            }
          }
        
        })
      })
          


const tSG = await client.guilds.fetch(`905919731284967424`)
const alreadyCommands2 = await tSG.commands.fetch()
      alreadyCommands2.each(async (a) => {
        data2.forEach(async (d) => {
          
          if (a.name == d.name) {
              
 if (a.description == d.description && a.options == d.options) {
            return
            
          } else if (!d.options) {
            return console.log2(`${d.name} doesn't have an options`,'error')
          }
        if (a.description == d.description && a.options.length != d.options.length) {
          
          return await tSG.commands.edit(a.id, d).then(() => console.log2(`Guild SlashCommand (/): ${d.name} Edited.`, "ready")).catch((e) => console.log(e));
        } else if (a.description != d.description && a.options.length == d.options.length) {
          return await tSG.commands.edit(a.id, d).then(() => console.log2(`Guild SlashCommand (/): ${d.name} Edited.`, "ready")).catch((e) => console.log(e));
        } else if (a.description != d.description && a.options.length != d.options.length) {
          return await tSG.commands.edit(a.id, d).then(() => console.log2(`Guild SlashCommand (/): ${d.name} Edited.`, "ready")).catch((e) => console.log(e));
        }
        
          } else {            
            
            if (!alreadyCommands2.find(flee => flee.name == d.name)) {
              return await tSG.commands.create(d).then(() => console.log2(`Guild SlashCommand (/): ${d.name} Created.`, "ready")).catch((e) => console.log(e));
            }
          }
        
        })
      })
          
    });
}