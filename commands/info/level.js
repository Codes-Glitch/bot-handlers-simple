const db = require("quick.db");
const discord = require("discord.js");
const { getInfo } = require("../../handlers/xp.js");
const { MessageEmbed } = require("discord.js");

const gagal = `RED`;
module.exports = {
  name: "level",
  description: "Get the level of author or mentioned",
  usage: "level <user>",
  cooldown: 10,
  category: "info",
  run: (client, message, args, mass) => {
    message.delete();
    const user = message.mentions.users.first() || message.author;
    let chnnel = message.guild.channels.cache.find(
      x => x.id === db.get(`level_${message.guild.id}`)
    );
    if (user.id === client.user.id) {
      //IF BOT
      return message.channel.send("😉 | I am on level 500");
    }

    if (user.bot) {
      return message.channel.send("Bot do not have levels");
    }

    let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;

    const { level, remxp, levelxp } = getInfo(xp);
    if (xp === 0)
      return message.channel.send(`**${user.tag}** is out of the xp`);

    const embed = new discord.MessageEmbed()
      .setAuthor(user.username, message.guild.iconURL())
      .setColor("#ff2050")
      .setThumbnail(user.avatarURL()).setDescription(`**LEVEL** - ${level}
**XP** - ${remxp}/${levelxp}`);

    const www = new MessageEmbed()
      .setTitle("Discord Developer")
      .setDescription(
        `Check Channel ${chnnel ||
          `<a:failed:798526823976796161> Failed to Send`}`
      )
      .setColor(gagal)
      .setTimestamp();
    message.channel
      .send(www)
      .then(m => m.delete({ timeout: 12000 }).catch(e => {}));
    /*if (!chnnel === null) {

    return;*/

    chnnel.send(embed).then(m => {
      m.react("✅");

      m.react("❌");
    });
  }
};
