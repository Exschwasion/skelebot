import { WordWeight, AppState, MarkovData } from "../store/types";
import config from '../../config.json'

export function generateText(state: AppState, id: string, maxLength: number) {
    const data = state.users[id].markovData
    let text = ''

    if (Object.keys(data.startTuples).length === 0 || Object.keys(data.dictionary).length === 0) {
        return text
    }

    text += generateSentence(data)

    while(text.length < maxLength) {
        let nextText = generateSentence(data)
        if (nextText.length + text.length > maxLength) {
            break
        }

        text += ' ' + nextText
    }

    return text
}

function generateSentence(data: MarkovData) {
    const start = weightedRandom(data.startTuples)

    let text = start
    let key = start
    while (text.length < 400) {
        if (data.dictionary[key] === undefined || data.dictionary[key] === null) {
            return text
        }

        let nextWord = weightedRandom(data.dictionary[key])
        if (nextWord === '') {
            return text
        }

        text += ' ' + nextWord

        let words = key.split(' ')
        words.shift()
        words.push(nextWord)
        key = words.join(' ')
    }

    return text
}

function weightedRandom(dict: WordWeight): string {
    const totalWeights = Object.values(dict).reduce((prev, cur) => prev + cur)
    const random = Math.floor(Math.random() * totalWeights)

    const words = Object.keys(dict)
    let current = 0
    for (let i = 0; i < words.length; i++) {
        current += dict[words[i]]
        if (random < current) {
            return words[i]
        }
    }

    return ''
}