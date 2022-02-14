const {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  Permissions
} = require('discord.js')
const Discord = require('discord.js')
const axios = require('axios')
const permissionFlags = [
{name: 'CREATE_INSTANT_INVITE',value: 'CREATE_INSTANT_INVITE'},
{name: 'KICK_MEMBERS',value: 'KICK_MEMBERS'},
{name: 'BAN_MEMBERS',value: 'BAN_MEMBERS'},
{name: 'ADMINISTRATOR',value: 'ADMINISTRATOR'},
{name: 'MANAGE_CHANNELS',value: 'MANAGE_CHANNELS'},
{name: 'MANAGE_GUILD',value: 'MANAGE_GUILD'},
{name: 'ADD_REACTIONS',value: 'ADD_REACTIONS'},
{name: 'VIEW_AUDIT_LOG',value: 'VIEW_AUDIT_LOG'},
{name: 'VIEW_CHANNEL',value: 'VIEW_CHANNEL'},
{name: 'SEND_MESSAGES',value: 'SEND_MESSAGES'},
{name: 'SEND_TTS_MESSAGES',value: 'SEND_TTS_MESSAGES'},
{name: 'MANAGE_MESSAGES',value: 'MANAGE_MESSAGES'},
{name: 'ATTACH_FILES',value: 'ATTACH_FILES'},
{name: 'READ_MESSAGE_HISTORY',value: 'READ_MESSAGE_HISTORY'},
{name: 'MENTION_EVERYONE',value: 'MENTION_EVERYONE'},
{name: 'USE_EXTERNAL_EMOJIS',value: 'USE_EXTERNAL_EMOJIS'},
{name: 'VIEW_GUILD_INSIGHTS',value: 'VIEW_GUILD_INSIGHTS'},
{name: 'CHANGE_NICKNAME',value: 'CHANGE_NICKNAME'},
{name: 'MANAGE_NICKNAMES',value: 'MANAGE_NICKNAMES'},
{name: 'MANAGE_ROLES',value: 'MANAGE_ROLES'}
]
const panelOpt = {
    name: 'panel',
    autocomplete: true,
    type: 'STRING',
    required: true,
    description: 'Provide a panel name for the bot'
}
module.exports = {
  name: "todo",
  description: "Main Todo Command",
  owner: false,
  options: [{
    name: 'setup',
    description: 'The bot makes a channel for the todo list',
    type: 'SUB_COMMAND',
    options: [{
      name: 'name',
      required: true,
      description: 'Provide a name for the new todo panel.',
      type: 'STRING'
    }]
  }, {
    name: 'add',
    description: 'Add something to the todo list',
    type: 'SUB_COMMAND',
    options: [panelOpt,{
      name: 'name',
      required: true,
      description: 'Provide a name for the new todo list item',
      type: 'STRING'
    }]
  },{
      name: 'permissions',
      description: 'Change the permissions to a specific panel',
      type: 'SUB_COMMAND',
      options: [panelOpt,{
          name: 'permission',
          required: true,
          description: 'Provide a new permission for that panel',
          type: 'STRING',
          choices: permissionFlags
      }]
  },{
    name: 'delete',
    description: 'Delete something from the todo list',
    type: 'SUB_COMMAND',
    options: [panelOpt,{
      name: 'name',
      autocomplete: true,
      required: true,
      description: 'Provide the name of the todo-list item',
      type: 'STRING'
    }]
  }, {
    name: 'mark',
    description: 'Mark something from the todo list',
    type: 'SUB_COMMAND',
    options: [panelOpt,{
      name: 'name',
      required: true,
      autocomplete: true,
      description: 'Provide the todo item name',
      type: 'STRING'
    }, {
      name: 'marker',
      required: true,
      description: 'Choose a marker for your todo list item',
      type: 'STRING',
      choices: [{
        name: 'in-progress',
        value: 'inProgress'
      }, {
        name: 'not-done',
        value: 'notDone'
      }, {
        name: 'complete',
        value: 'done'
      }]
    }]
  }, {
    name: 'name',
    description: 'Edit an existing todo list item',
    type: 'SUB_COMMAND',
    options: [panelOpt,{
      name: 'name',
      autocomplete: true,
      description: 'Provide the existing todo list item',
      type: 'STRING',
      required: true
    }, {
      name: 'newname',
      description: 'Provide a new name for that item',
      type: 'STRING',
      required: true
    }]
  }, {
    name: 'nuke',
    description: 'Get rid of everything on your todo list [VOTE NEEDED]',
    type: 'SUB_COMMAND',
    options: [panelOpt]
  }, {
    name: 'addmultiple',
    description: 'Add more than 1 item at a time. [VOTE NEEDED]',
    type: 'SUB_COMMAND',
    options: [panelOpt,{
      name: '1',
      description: 'Provide a name for this item.',
      type: 'STRING',
      required: false
    }, {
      name: '2',
      description: 'Provide a name for this item.',
      type: 'STRING',
      required: false
    }, {
      name: '3',
      description: 'Provide a name for this item.',
      type: 'STRING',
      required: false
    }, {
      name: '4',
      description: 'Provide a name for this item.',
      type: 'STRING',
      required: false
    }, {
      name: '5',
      description: 'Provide a name for this item.',
      type: 'STRING',
      required: false
    }, {
      name: '6',
      description: 'Provide a name for this item.',
      type: 'STRING',
      required: false
    }, {
      name: '7',
      description: 'Provide a name for this item.',
      type: 'STRING',
      required: false
    }, {
      name: '8',
      description: 'Provide a name for this item.',
      type: 'STRING',
      required: false
    }, {
      name: '9',
      description: 'Provide a name for this item.',
      type: 'STRING',
      required: false
    }, {
      name: '10',
      description: 'Provide a name for this item.',
      type: 'STRING',
      required: false
    }, ]
  },{
    name: 'paneldelete',
    description: 'Delete a panel using this command',
    type: 'SUB_COMMAND',
    options: [panelOpt]
  }],
  execute: async (interaction, client) => {
    await interaction.deferReply()
      const guild = await interaction.guild
    const subCommand = await interaction.options.getSubcommand()
    const panel = await interaction.options.getString('panel')
    const db = await client.db.get(`setup_${guild?.id}`) || undefined
    var dbPanelArray = undefined
      if (db) {
        db.forEach(async (x) => {
      if (x.id == panel) {
        dbPanelArray = x;
          return;
      }
    })
      } 
    
    
	const permissionDB = await client.db.get(`todo_${interaction?.guild?.id}_${dbPanelArray?.id}_permission`) || 'MANAGE_MESSAGES'
    
      
         if (!interaction.member.permissions.has(Permissions?.FLAGS[`${permissionDB}`])) {
      return interaction.followUp({
        content: `You cannot use this command because you don\'t have the right permissions for this panel. \`${permissionDB}\``
      })
    } else {
        switch (subCommand) {

      
            
      case 'add':
    require('./subCommands/add.js').execute(interaction,client,dbPanelArray,db)
        break;


      case 'delete':
    require('./subCommands/delete.js').execute(interaction,client,dbPanelArray,db)
        break;


      case 'mark':
    require('./subCommands/mark.js').execute(interaction,client,dbPanelArray,db)
        break;


      case 'edit':
    require('./subCommands/edit.js').execute(interaction,client,dbPanelArray,db)
        break;

      case 'nuke':
        require('./subCommands/nuke.js').execute(interaction,client,dbPanelArray,db)
        break


      case 'addmultiple':
        require('./subCommands/addmultiple.js').execute(interaction,client,dbPanelArray,db)
        break
    }
    }
    
      if (!interaction.member.permissions.has(Permissions?.FLAGS.MANAGE_MESSAGES)) {
      return interaction.followUp({
        content: `You cannot use this command because you don\'t have the right permissions for this panel. \`${permissionDB}\``
      })
    } else {
        switch (subCommand) {
          case 'setup':
		require('./subCommands/setup.js').execute(interaction, client,dbPanelArray, db)
        break
            case 'paneldelete':
        require('./subCommands/paneldelete.js').execute(interaction,client,dbPanelArray,db)
      break
                    case 'permissions':
            require('./subCommands/permissions.js').execute(interaction,client,dbPanelArray,db)
            break
    }
    }
    

  }
}