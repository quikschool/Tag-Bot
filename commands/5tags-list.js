const tags = require('../tag');
const Discord = require('discord.js');

module.exports = {
    commands: ['tagslist', 'tags-list', 'list', 'tags'],
    minArgs: 0,
    maxArgs: 0,
    permissions: ['MANAGE_MESSAGES'],
    description: 'lists all the tags stored from this server and lists them',
    callback: async (message) => {
        const guild = message.guild.id;
        let tagsList = [];
        let tagNames = [];
        let tagInfos = [];
        const results = await tags.tagsList(guild);
        for (const result of results) {
            tagsList.push(result.tag);
            tagNames.push(result.tagName);
            tagInfos.push(result.tagInfo);
        }
        let namesList = '.'
        let tagsContent = '.'
        let infoList = '.'
        for (const tagName of tagNames) {
            namesList += `\n**${tagName}**\n`
        }
        for (const tagList of tagsList) {
            tagsContent += `\n${tagList}\n`
        }
        for (const tagInfo of tagInfos) {
            infoList += `\n${tagInfo}\n`
        }

        embed = new Discord.MessageEmbed()
            .setTitle('Here is a list of all the tags on this server:')
            .setColor('#FFFFAA')
            .addFields(
                {
                    name: 'Tag Name\n',
                    value: namesList,
                    inline: true
                },
                {
                    name: 'Tag Content\n',
                    value: tagsContent,
                    inline: true
                },
                {
                    name: 'Tag Info\n',
                    value: infoList,
                    inline: true
                }
            );
        
        message.channel.send(embed);
    }
}