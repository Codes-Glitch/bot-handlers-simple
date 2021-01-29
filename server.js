const Discord = require("discord.js");
const fs = require("fs");
const db = require("wio.db");
//const dbw = require("quick.db");
const client = new Discord.Client();
const {
  Default_Prefix,
  Token,
  Support,
  Color,
  Dashboard
} = require("./config.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map();

client.on("ready", () => {
  client.user.setStatus("idle");
  client.user.setActivity(
    `\nCommands: ${Default_Prefix}help\n${client.guilds.cache.size} Server | ${client.users.cache.size} User \nMade By FC 么 Glitch Editz `,
    {
      type: "WATCHING"
    }
  );
  console.log(`Hi, ${client.user.username} is now online!`);
});
const { readdirSync } = require("fs");

let modules = ["./commands/../"];

/*modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(error, files) {
    if (error) return new Error(`${error}`);
    files.forEach(function(file) {
      if (!file.endsWith(".js"))*/

readdirSync("./commands/").forEach(dir => {
  // Filter so we only have .js command files

  const commands = readdirSync(`./commands/${dir}/`).filter(file =>
    file.endsWith(".js")
  );

  // throw new Error(`A File Does Not End With .js!`);
  for (let file of commands) {
    let command = require(`./commands/${dir}/${file}`);
    console.log(`${command.name} Has Been Loaded - ✅`);
    if (command.name) client.commands.set(command.name, command);
    if (command.aliases) {
      command.aliases.forEach(alias => client.aliases.set(alias, command.name));
    }
    if (command.aliases.length === 0) command.aliases = null;
  }
});
client.on("message", async message => {
  if (message.author.bot || !message.guild || message.webhookID) return;

  let Prefix = await db.fetch(`Prefix_${message.guild.id}`);
  if (!Prefix) Prefix = Default_Prefix;

  if (!message.content.startsWith(Prefix)) return;

  let args = message.content
    .slice(Prefix.length)
    .trim()
    .split(/ +/g);
  let cmd = args.shift().toLowerCase();

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;

  if (!command)
    return message.channel.send(
      `No Command Found - ${cmd.charAt(0).toUpperCase() + cmd.slice(1)}`
    );
  //const db = require("quick.db")

const now = Date.now()

if(db.has(`cd_${message.author.id}`)) {

  const expirationTime = db.get(`cd_${message.author.id}`) + 3000

  if(now < expirationTime) {

  const timeLeft = (expirationTime - now) / 1000;

		return message.reply(`<a:failed:798526823976796161> Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmd}\` command.`);

  }

}

  db.set(`cd_${message.author.id}`, now);

  setTimeout(() => {

    db.delete(`cd_${message.author.id}`)

  },3000) 

  try {
    if (command) {
      command.run(client, message, args);
    }
  } catch (error) {
    return message.channel.send(`Something Went Wrong, Try Again Later!`);
  }
});

client
  .login(Token)
  .catch(() =>
    console.log(`Invalid Token Is Provided - Please Give Valid Token!`)
  );
