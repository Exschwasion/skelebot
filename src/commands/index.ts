import * as fs from 'fs'
import * as util from 'util'
import { Command, CommandGroup } from '../types'

const readdir = util.promisify(fs.readdir)
const loadCommands = async () => {
    let fileNames
    try {
        fileNames = await readdir(__dirname)
        fileNames = fileNames.filter(file => file.endsWith('.ts') && file !== 'index.ts')
    } catch(err) {
        console.log(err)
        return {}
    }

    const commands: CommandGroup = {}
    for (let i = 0; i < fileNames.length; i++) {
        const command: Command = (await import('./' + fileNames[i])).default
        commands[command.name] = command
    }
    return commands
}

export default loadCommands