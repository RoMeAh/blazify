const {MessageEmbed, Discord} = require('discord.js');
const mongoose = require("mongoose");
const Warn = require("../../models/warn.js")

module.exports = {
    name: "warnings",
    category: "fun",
    description: "XP",
    run: async (client, message, args) => {
    await message.delete();
    let allGuilds = client.guilds.cache.array();
    for (let i = 0; i < allGuilds.length; i++) {
    Settings.findOne(
      { guildID: allGuilds[i].id },
      async (err, settings) => {
        if (err) console.log(err);

        if (!settings) {
          enableModeration = false;
        } else {
          enableModeration = settings.enableModeration
        }
      })
    }
    if(enableModeration === true) {
    if (args[0]) {
        let member = message.mentions.members.first();


        await Warn.findOne({ userID: member.user.id, guildID: message.guild.id }, (err, warns) => {
          if (err) console.log(err);

          if (!warns) {
            const newWarn = new Warn({
              userName: message.author.username,
              userID: message.author.id,
              guildID: message.guild.id,
              warns: "The warnings will be shown down below"
              });
          }

          let embed = new MessageEmbed()
            .setTitle(`${user.username}'s Warnings`)
            .setColor('#ed0e0e')
            if(!warns) {
              embed.addField("Warnings", "The warnings will be shown down below", true);
              return message.channel.send(embed);
            }else {
              embed.addField("Warnings", warns.warns, true)
              return message.channel.send(embed);
        }
        });
      } else {
        await Warn.findOne({ userID: message.author.id, guildID: message.guild.id }, (err, warns) => {
          if (err) console.log(err);

          if (!warns) {
            const newWarn = new Warn({
              userID: message.author.id,
              userName: message.author.username,
              guildID: message.guild.id,
              warns: "The warnings will be shown down below"
            });
            newWarn.save().catch(err => console.log(err));
          }


          let embed = new MessageEmbed()
            .setTitle(`${message.author.username}'s Warnings`)
            .setColor('#ed0e0e')
            if(!warns) {
              embed.addField("Warnings", "The warnings will be shown down below", true);
               return message.channel.send(embed);
            }else {
              embed.addField("Warnings", warns.warns, true)
              return message.channel.send(embed);
        }
        });
      }
    }
  }
  };
