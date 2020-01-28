import { Client } from 'discord.js'
import config from "../config.json";

const client: Client = new Client();

client.once('ready', () => {
    if (client.user !== null) {
        client.user.setActivity(config.status, {type: "PLAYING"});
    }

	console.log('Ready!');
});

client.login(config.token);

client.on('message', message => {
    if (!message || message.author.bot) {
        return;
    }

    if (message.content.startsWith(config.prefix)) {
        let firstSpace: number | undefined = message.content.trim().indexOf(' ')
        firstSpace = firstSpace > 0 ? firstSpace : undefined;
        let afterPrefix: string = message.content.slice(config.prefix.length, firstSpace);

        console.log(afterPrefix)
    }
})