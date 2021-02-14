const loadCommands = require('./load-commands');
const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    commands: ['help'],
    description: 'A very helpful command to help you use this bot',
    callback: (message) => {
        let reply = 'Why hello there! Here are my commands: \n\n\n ';

        let helpText = '';

        const commands = loadCommands();

        for (const command of commands) {
            let permissions = command.permission;

            if (permissions) {
                let hasPermission  = true;
                if (typeof permissions === 'string') {
                    permissions = [permissions];
                }

                for (const permission of permissions) {
                    if (!message.member.hasPermission(permission)) {
                        hasPermission = false;
                        break;
                    }
                }

                if (!hasPermission) {
                    continue;
                }
            }

            const mainCommand = 
                typeof command.commands === 'string' 
                    ? command.commands 
                    : command.commands[0];
            const args = command.expectedArgs ? ` ${command.expectedArgs}` : '';
            const { description } = command;

            helpText += `**${prefix}${mainCommand}${args}**: \n${description}\n\n`;
        }

        embed = new Discord.MessageEmbed()
            .setTitle(reply)
            .setColor('#FF0000')
            .addFields(
                {
                    name: 'Commands: ',
                    value: helpText
                }
            );

        message.channel.send(embed);
    }
}