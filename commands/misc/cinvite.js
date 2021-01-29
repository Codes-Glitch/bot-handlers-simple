const { MessageEmbed, Discord } = require("discord.js");

const Color = `GREEN`;

module.exports = {

  name: "cinvite",

  category: "misc",

  run: async (client, message, args, ) => {

    message.delete();

     /*const emg = new Discord.messageEmbed()

     .setTitle("⚠️Warning⚠️")

     . setDescription ("```\nyou do not have permission to use this command,This is only owner.\n```")

     .setTimestamp()*/

   if (message.author.id != `${message.guild.ownerID}` )

     

   //  return message.channel.send(  

       return message.channel.send("```\nyou do not have permission to use this command,This is only owner.\n```").then(m=>m.delete({timeout:550000}).catch(e=>{})

)

    const channels =

      message.mentions.channels.first() ||

      message.guild.channels.cache.get(`${args[0]}`) ||

      message.guild.channels.cache.find(x => x.name === `${args.join(" ")}`) ||

      message.channel;

    let check;

    if (args[0] === "temp") {

      check = "true";

    } else if (args[1] === "temp") {

      check = "true";

    } else {

      check = "false";

    }

    let check2;

    if (args[0] === "temp") {

      check2 = "86400";

    } else if (args[1] === "temp") {

      check2 = "86400";

    } else {

      check2 = "0";

    }

    channels

      .createInvite({

        temporary: `${check}`,

        maxAge: `${check2}`,

        maxUses: 0,

        reason: `Requested By : ${message.author.username}`

      })

      .then(InviteCode =>

        message.channel.send(

          new MessageEmbed()

            .setColor(`${Color}`)

            .setTitle(`${channels.name} Invite`)

            .addField(`Link`, `https://discord.gg/${InviteCode.code}`)

            .setFooter(`Requested By : ${message.author.username}`)

            .setTimestamp()

        )

      );

  }

};

