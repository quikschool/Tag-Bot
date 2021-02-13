const Discord = require('discord.js');
const client = new Discord.Client();
const mongo = require('./mongo')
const config = require('./config.json');
const loadCommands = require('./commands/load-commands')

client.on('ready', async () => {
  console.log('The client is ready!');

  await mongo().then(mongoose => {
    try {
      console.log('Connected to MongoDB!');
    } finally {
      mongoose.connection.close();
    }
  });

  loadCommands(client);
});

client.login(config.token);
