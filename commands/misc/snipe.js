const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "snipe",
  category: "misc",
  usage: "snipe",
  description: "get deleted messages",
  run: async (client, message, args) => {
    const msg = client.snipes.get(message.channel.id);
    if (!msg)
      return message.channel
        .send("There are no deleted messages in this channel!")
        .then(m => {
          m.react("🔄");
        });
    const embed = new Discord.MessageEmbed()
      .setTitle("📋Snipe Message Delete📋")
      //  .setAuthor(msg.author)
      .setDescription(
        `=> Author: \`\`\`\n${
          msg.author
        }\n\`\`\`\n => Message Delete: \n\`\`\`\n${msg.content ||
          "Tell That No Response To Embed"}\n\`\`\`\nClink :x: to clear this message`
      )
      .setTimestamp()
      .setColor("GREEN");
    if (msg.image) embed.setImage(msg.image);
    message.channel.send(embed).then(m => {
      m.react("✅");
      m.react("❌");
      client.on("messageReactionAdd", async (reaction, user) => {
        if (user.bot) return; // If the user was a bot, return.

        if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.

        if (reaction.emoji.name === "❌") {
          message.channel.bulkDelete(1);
        }
      });
      // message.channel.send("If there is a new delete message, you can use this command").then(m=>m.delete({timeout:12000}).catch(e=>{}))

      // }})}})
    });
  }
};
