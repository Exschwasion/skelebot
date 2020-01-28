export function splitIntoSentences(text: string): string[] {
    let result: string[] | null = text.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g)
    if (result === null) {
        result = []
    }
    return result.map(sentence => sentence.trim())
}