module.exports = {
  commands: 'ping',
  minArgs: 0,
  maxArgs: 0,
  description: 'A relic from the beta testing stage of this bot; forever in our memories...',
  callback: (message) => {
    message.reply('Pong!');
  },
}
