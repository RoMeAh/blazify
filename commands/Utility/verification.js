const { MessageEmbed } = require("discord.js")
const Settings = require("../../models/configsetting.js")
let enableVerification;
module.exports = {
  name: "verify",
  run: async (client, message) => {
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
      guildID: message.guild.id
  });
  const {enableVerification} = guildSettings;
if(!enableMusic) return message.channel.send("Hmm it seems like the Verification commands are not enabled if you want to enable them please go to the dashboard. Click [here](https://blazify-dashboard.glitch.me)") 
    if(message.channel.id === '700401979280719943')
    {
        await message.delete().catch(err => console.log(err));
        const role = message.guild.roles.cache.get('700392946863833249');
        if(role) {
            try {
                await message.member.roles.add(role);
                const Embed = new MessageEmbed()
                .setTitle("VERIFIED")
                .setDescription("You have been verified")
                .setFooter("Only use this if Captcha did not come or Captcha is Disabled")
                message.channel.send(Embed)
                console.log("Role added!");
            }
            catch(err) {
                console.log(err);
            }
        }
    }
  }
  }

