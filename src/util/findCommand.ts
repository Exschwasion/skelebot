import { Command, CommandGroup } from "../types";

export default function(commands: CommandGroup, name: string): Command | undefined {
    let command: Command | undefined = commands[name]
    if (command === undefined) {
        Object.keys(commands).forEach((name: string) => {
            if (commands[name].alias !== undefined && commands[name].alias!.includes(name)) {
                command = commands[name]
                return
            }
        })
    }
    return command
}