import { Command } from '../types'

const ping: Command = {
    name: 'ping',
    description: 'pong',
    execute(message) {
        message.channel.send('pong')
    }
}

export default ping