const { MessageEmbed } = require("discord.js");
const { post } = require("node-superfetch");

module.exports = {
    name: "eval",
    description: "Eval Code",
    default_permission: false,
    owner: true,
    options: [{
      name: 'code',
      description: 'Kweeme, provide code.. Don\'t forget it.',
      required: true,
      type: 'STRING'
    }],
    execute: async (interaction, client) => {
       const code = interaction.options.getString('code')
        const embed = new MessageEmbed()
            .addField("Input", "```js\n" + code + "```")
            .setColor(client.config.embedColor)

        try {
            if (!code) return interaction.reply({content: "Please include the code.", ephemeral: true});
            let evaled;

            if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("process.env")) {
                evaled = "No, shut up, what will you do it with the token?";
            } else {
                evaled = await eval(`async function run() {${code}}; run()`);
            }

            if (typeof evaled !== "string") evaled = await require("util").inspect(evaled, { depth: 0 });

            let output = clean(evaled);
            if (output.length > 1024) {
               
                const { body } = await post("https://hastebin.com/documents").send(output);
                embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor(client.embedColor);
              
            } else {
                embed.addField("Output", "```js\n" + output + "```").setColor(client.embedColor);
            }

            interaction.reply({ephemeral: true, embeds: [embed]});

        } catch (error) {
            let err = clean(error);
            if (err.length > 1024) {
               
                const { body } = await post("https://hastebin.com/documents").send(err);
                embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor("RED");
            } else {
                embed.addField("Output", "```js\n" + err + "```").setColor("RED");
            }

            interaction.reply({ephemeral: true, embeds: [embed]});
        }
    }
}

function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}