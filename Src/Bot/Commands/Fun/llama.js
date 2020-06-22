const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../../Lib/Structures/colours.json");
const fetch = require('node-fetch');
const Settings = require("../../../Lib/Database/models/configsetting.js");
const BlazifyClient = require("../../../Lib/Base/Command");
class Llama extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "llama",
      description: "Generates a Random Picture of Llama",
      usage: "b3llama",
      category: "Fun",
      cooldown: 1000,
      aliases: ["lambo"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(client, message, args) {
      const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableFun} = guildSettings;
  if(!enableFun) return message.channel.send("Hmm it seems like the Fun commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)");
        let msg = await message.channel.send("Generating...")

        fetch("https://apis.duncte123.me/llama")
        .then(res => res.json()).then(body => {
            if(!body) return message.reply(" whoops. I broke, try again!")

            let embed = new MessageEmbed()
            .setColor(cyan)
            .setAuthor(`${client.user.username} Llama!`, message.guild.iconURL)
            .setImage(body.data.file)
            .setTimestamp()
            .setFooter(client.user.username.toUpperCase(), client.user.displayAvatarURL)

                msg.edit(embed)
        })
    }
}
module.exports = Llama;