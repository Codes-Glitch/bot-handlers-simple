const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "uptime",
  aliases: ["uptime"],
  usage: "uptime",
  category: "info",
  description: "Get advance stats of given person or yourself",
  run: async (client, message, args) => {
    message.delete();
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
  //  let ssay = Math.floor(days / 1)
    let sunday = Math.floor(days / 7);
    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    sunday %= 7;
    const u = message.mentions.members.first();
    const us = message.guild.members.fetch(client.user.id);
    const ddi = `790937024941129759`;
    const uptime = new MessageEmbed()
      .setTitle(
        "<:slowmode:799034410799595590> TIME BOT ONLINE <:slowmode:799034410799595590>"
      )
      .setDescription(
        `<a:success:798526789114134548> <@${ddi}> : \n\`Second: ${seconds}\nMinutes: ${minutes}\nHours: ${hours}\nday: ${days}\``
      )
      .setColor("GREEN")
      .setTimestamp();
    return message.channel.send(uptime);
  }
};
