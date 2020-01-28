import { Message } from "discord.js";
import { UserState, AppState, MarkovDictionary } from "../store/types";
import { splitIntoSentences } from "../util/splitSentences";
import * as config from '../../config.json'

export function updateDictionary(state: AppState, message: Message) {
    const author = message.author.id
    if (!state.users.hasOwnProperty(author)) {
        state.users[author] = new UserState()
    }
    let data = state.users[author].markovData

    const sentences = splitIntoSentences(message.content)

    sentences.forEach((sentence, index) => {
        const words = sentence.split(' ')
        if (words.length < config.markov.order) {
            return
        }

        let startTuple = words[0]
        for (let i = 1; i < config.markov.order; i++) {
            startTuple += ' ' + words[i]
        }

        if (data.startTuples[startTuple] === undefined) {
            data.startTuples[startTuple] = 1
        } else {
            data.startTuples[startTuple]++
        }

        buildTuples(data.dictionary, words)

        if (index < sentences.length - 1) {
            let nextWords = sentences[index + 1].split(' ')
            if (nextWords.length < config.markov.order) {
                return
            }

            let sentenceEndTuple = ''
            let boundaryWords = []
            for (let i = 0; i < config.markov.order; i++) {
                sentenceEndTuple += ' ' + words[words.length - config.markov.order + i]
                boundaryWords.unshift(words[words.length - 1 - i])
                boundaryWords.push(nextWords[i])
            }

            sentenceEndTuple = sentenceEndTuple.trim()
            buildTuples(data.dictionary, boundaryWords)
            if (data.dictionary[sentenceEndTuple][' '] === undefined) {
                data.dictionary[sentenceEndTuple][' '] = 1
            } else {
                data.dictionary[sentenceEndTuple][' ']++
            }
        }
    })
}

function buildTuples(dictionary: MarkovDictionary, words: string[]) {
    for (let i = 0; i < words.length - config.markov.order; i++) {
        let tuple = words[i]
        for (let j = 1; j < config.markov.order; j++) {
            tuple += ' ' + words[i + j]
        }

        if (dictionary[tuple] === undefined) {
            dictionary[tuple] = {}
        }

        let nextWord = ''
        if (i + config.markov.order < words.length) {
            nextWord = words[i + config.markov.order]
        }

        if (dictionary[tuple][nextWord] === undefined) {
            dictionary[tuple][nextWord] = 1
        } else {
            dictionary[tuple][nextWord]++
        }
    }
}