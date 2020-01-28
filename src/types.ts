import { Message } from 'discord.js'

export interface Command {
    name: string,
    alias?: string[],
    description?: string,
    usage?: string,
    cooldown?: number,
    execute: (message: Message, args: string[]) => any
}

export type CommandGroup = {
    [name: string]: Command
}