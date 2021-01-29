const db = require("quick.db");

const DISCORD = require("discord.js");
module.exports = {

  name: "embed",

  category: "misc",

  description: "Get bot embed :/",

  usage: "embed <msg>",

  run: async (client, message, args) => {
   message.delete();
   let embedtext = args.slice(0).join(" ")
          if(!embedtext) return message.channel.send("Enter the words first!").then(m=>m.delete({timeout:5000}).catch(e=>{}))
                  let embed = new DISCORD.MessageEmbed()

           .setDescription(embedtext)
           . setColor ("GREEN")
           message.channel.send(embed)//.then(m => {

   //   m.react("✅")

    //  m.react("❌")

   // });

       }

}