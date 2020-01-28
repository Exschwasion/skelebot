import { Command } from '../types'
import config from "../../config.json";
import loadCommands from './index'
import findCommand from '../util/findCommand';

const help: Command = {
    name: 'help',
    usage: '[command]',
    description: 'List all commands, or get help with a specific command.',
    async execute(message, args) {
        const commands = await loadCommands()
        let text = ''
        if (args.length === 0) {
            text += 'Available commands: '
            text += Object.values(commands).map(command => command.name).join(', ')
            text += `\n Use \`${config.prefix}help [command name]\` to get info on a specific command.`
        } else {
            let command: Command | undefined = findCommand(commands, args[0])
            if (command === undefined) {
                text += `${args[0]} is not a valid command.\n`
                text += `Use ${config.prefix}help to get a list of commands.`
            } else {
                text += `**Usage:** ${config.prefix}${command.name}`
                if (command.usage) {
                    text += ` ${command.usage}`
                }

                if (command.alias) {
                    text += `\n**Aliases:** ${command.alias.join(', ')}`
                }

                if (command.description) {
                    text += `\n${command.description}`
                }
            }
        }

        message.channel.send(text)
    }
}

export default help