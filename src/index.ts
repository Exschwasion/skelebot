import { Client } from 'discord.js';
import config from "../config.json";
import loadCommands from './commands'
import { Command, CommandGroup } from './types.js';
import findCommand from './util/findCommand';

const client: Client = new Client();
let commands: CommandGroup;

client.once('ready', async () => {
    commands = await loadCommands()

    if (client.user !== null) {
        client.user.setActivity(config.status, {type: "PLAYING"});
    }

	console.log('Ready!');
});

client.login(config.token);

client.on('message', message => {
    if (!message || message.author.bot || message.guild === null) {
        return;
    }

    // TODO: Handle markov dictionary updating

    // Command parsing
    if (!message.content.startsWith(config.prefix)) {
        return
    }
    
    let firstSpace: number | undefined = message.content.trim().indexOf(' ');
    firstSpace = firstSpace > 0 ? firstSpace : undefined;
    let commandName: string = message.content.slice(config.prefix.length, firstSpace);
    let args: string[] = message.content.split(' ')
    args.shift()

    let command: Command | undefined = findCommand(commands, commandName)
    if (command === undefined) {
        return
    }

    try {
        command.execute(message, args)
    } catch(err) {
        message.channel.send(`Error running command: ${err}`)
    }
})