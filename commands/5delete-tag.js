const tag = require('../tag');

module.exports = {
    commands: ['deletetag', 'removetag', 'delete', 'remove'],
    expectedArgs: "<tag name>",
    permissionError: 'You do not have permission to run this command.',
    minArgs: 1,
    maxArgs: 1,
    permissions: [],
    requiredRoles: [],
    description: "This is a command to delete any tag you have added or created when you are done with it and no longer need it as a reminder (NOTE: you can't delete other people's tags)",
    callback: async (message, arguments) => {
        const tagName = arguments[0]
        const author = message.author.id;
        const deleteStatus = await tag.deleteTag(tagName, author);
        if (deleteStatus === "fail") {
            message.reply("an error has occured! If you're sure this tag exists, please report this to the developers");
            return;
        }
        message.reply(`${tagName} successfully deleted!`);
    }
}