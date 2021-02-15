const tag = require('../tag');

module.exports = {
  commands: ['addtag', 'add'],
  expectedArgs: '<tag name> <tag> (tag info)',
  permissionError: 'You need admin permissions to run this command',
  minArgs: 2,
  maxArgs: null,
  description: 'This is a command which you can use to save a tag as a reminder which you can get from the bot any time you want',
  callback: async (message, arguments) => {
    const tagName = arguments[0];
    const tagContent = arguments[1];
    var tagInfo = null;
    
    if (arguments.length > 2) {
      const remaining = arguments;
      
      for (var i = 0; i < 2; i++) {
        remaining.shift();
      }
      
      var tagInfo = remaining.join(' ');
    } else {
      var tagInfo = null;
    }

    const addedTag = await tag.addTag(tagName, tagContent, tagInfo, message.author.id, message.guild.id);

    if (addedTag === null) {
      message.reply('there already exists a tag by this name in this server');
      return;
    } else if (addedTag === "fail") {
      message.reply('An error has occured while adding the tag; please report this to the developers.');
      return;
    }
    
    message.reply(`${tagName} has been added to the database!`);
  },
}
