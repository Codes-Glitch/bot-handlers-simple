//const { Default_Prefix, Color, Owner, Support, Donate } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");
const Owner = `767726828311543820`
const Support = `https://discord.gg/MKwyk4qdeb`
module.exports = {
  name: "invite",
  aliases: ["invitelink"],
  category: "help",
  description: "Give You My Invite Link, Etc!",
  usage: "Invite",
  run: async (client, message, args, ) => {
    message.delete()
    const Invite = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`, Owne = `<@${Owner}>`, Dev = `Legendary Emoji#1742`;
    
    const Embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle("🙏Thanks🙏")
    .addField("Invite Me", `[Click Me](${Invite})`, true)
    .addField("Support Server", `[Click Me](${Support})`, true)
    .addField("Owner", Owne, true)
    //.addField("Developer", Dev)
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("Invite Link - " + Invite)).then(m=>m.delete({timeout:44000}).catch(e=>{}))
  }
};
