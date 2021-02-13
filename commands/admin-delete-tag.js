const tag = require('../tag');

module.exports = {
    commands: ['admindelete', 'admin-delete', 'admin-deletetag', 'admindeletetag'],
    expectedArgs: '<tag name> <tag author>',
    permissionError: "You thought I would let you delete other people's tags that easily?",
    minArgs: 2,
    maxArgs: 2,
    permissions: ['MANAGE_MESSAGES'],
    description: 'This a command which can be used only by moderators to moderate and delete tags',
    callback: async (message, arguments) => {
        const tagName = arguments[0];
        const author = message.mentions.users.first();
        const deleteStatus = await tag.deleteTag(tagName, author.id);
        if (deleteStatus === "fail") {
            message.reply("An error has occured! If you're sure this tag exists, please report this to the developers");
            return;
        }
        message.reply(`${tagName} successfully deleted!`);
    }
}