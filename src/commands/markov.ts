import { Command } from '../types'
import state from '../store'
import config from '../../config.json'
import { generateText } from '../markov/generate';

const markov: Command = {
    name: 'markov',
    description: 'Generate a markov chain from previously sent messages.',
    execute(message, args) {
        let text = generateText(state, message.author.id, config.markov.maxLength)
        console.log(state.users)
        if (text.length === 0) {
            message.channel.send('No text could be generated.')
        } else {
            message.channel.send(text)
        }
    }
}

export default markov