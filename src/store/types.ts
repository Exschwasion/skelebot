export interface MarkovData {
    startTuples: WordWeight
    dictionary: MarkovDictionary
}

export type MarkovDictionary = {
    [tuple: string]: WordWeight
}

export type WordWeight = {
    [word: string]: number
}

export type UsersState =  {
    [id: string]: UserState
}

export class UserState {
    public markovEnabled: boolean = true
    public markovData: MarkovData = {
        startTuples: {},
        dictionary: {}
    }
}

export class AppState {
    users: UsersState = {}
}