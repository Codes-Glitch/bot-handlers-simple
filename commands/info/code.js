const fs = require("fs");

module.exports = {
  name: "code",

  description: "Display the code of the specified command.",

  usage: "code <category/cmd>",

  category: "info",

  run: (client, message, args, mass) => {
    message.delete();
    let code;

    try {
      code = fs.readFileSync(`commands/${args[0]}.js`).toString();
    } catch (error) {
      return message.channel.send(
        `I couldn't find a command called \`${args[0] || "Invalid cmd"}\`\n
        How to use Yes it is category/cmd
`
      );
    }

    try {
      if (args[0]) {
        const options = {
          method: "POST",

          body: code,

          headers: {
            "Content-Type": "application/json"
          }
        };

        message.channel.send(
          `Here is the code for the \`${
            args[0]
          }\` command:\n\`\`\`js\n${code.substr(0, 992883)}\`\`\``
        );
      }
    } catch (e) {
      return message.channel.send(
        "There was an error displaying the command's code."
      );
    }
  }
};
