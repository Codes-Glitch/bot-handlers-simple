//const message = require('../../message.js');
module.exports = {
    name: 'clear',
    description: 'Clears messages for you!',
   category: "misc",
  usage: "purge <how-many-messages>",
  description: "delete messages",
    run: async (client, message, args) => {
      message.delete()
      if(!args[0]) return message.reply('Please enter the amount of messages you want to clear!').then(m=>m.delete({timeout:9000}).catch(e=>{}))
        if(isNaN(args[0])) return message.reply('Please enter a real number!').then(m=>m.delete({timeout:9000}).catch(e=>{}))
        if(args[0] > 700) return message.reply('You cannot delete more than 700 messages!').then(m=>m.delete({timeout:9000}).catch(e=>{}))
        if(args[0] < 1) return message.reply('<a:failed:798526823976796161> To delete messages please delete atleast 1 message.').then(m=>m.delete({timeout:9000}).catch(e=>{}))
        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{

            message.channel.bulkDelete(messages);
          
          
return message.channel.send(`<a:success:798526789114134548> I have deleted ${args[0]} message!`).then(m=>m.delete({timeout:9000}).catch(e=>{}))
        });

    }

 

}