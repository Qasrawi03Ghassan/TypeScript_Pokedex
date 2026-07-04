import {getCommands} from './repl_commands.js';
import { State } from './../models/state.js';

export function cleanInput(str:string):string[]{
    let trimmed = str.trim();
    let lowered = trimmed.toLowerCase();
    let resultList = lowered.split(/\s+/);

    return resultList;
}

export function startREPL(state:State){
    let rl = state.interface;

    rl.prompt();
    rl.on("line",async (line: string) => {
        if(line === '' || line === null || line === undefined)rl.prompt();
        let words = cleanInput(line);
        let args = words.slice(1);
        let cmds = getCommands();

        const cmd = cmds[words[0]];

        if(cmd === null || cmd === undefined){
            console.log('Unknown command');
            rl.prompt();
            return;
        }
        
        try{
            await cmd.callback(state,...args);
            rl.prompt();
        }catch(e){
            console.log('ERROR: ' + e)
        }
    });
}