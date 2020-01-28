export interface MarkovData {
    startTuples: string[]
    dictionary: MarkovDictionary
}

export type MarkovDictionary = {
    [tuple: string]: WeightedTuple[]
}

export type WeightedTuple = {
    tuple: string
    weight: number
}

export type UsersState =  {
    [id: string]: UserState
}

export class UserState {
    public markovEnabled: boolean = true
    public markovData: MarkovData = {
        startTuples: [],
        dictionary: {}
    }
}

export class AppState {
    users: UsersState = {}
}