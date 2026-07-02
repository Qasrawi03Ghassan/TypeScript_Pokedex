import {createInterface} from "readline";
import {getCommands} from './repl_commands.js';

export function cleanInput(str:string):string[]{
    let trimmed = str.trim();
    let lowered = trimmed.toLowerCase();
    let resultList = lowered.split(/\s+/);

    return resultList;
}

const rl = createInterface({
    input:process.stdin,
    output:process.stdout,
    prompt:"Pokedex > "
});
export function startREPL(){
    rl.prompt();
    rl.on("line",(line) => {
        if(line === '' || line === null || line === undefined)rl.prompt();
        let words = cleanInput(line);
        let cmds = getCommands();

        const cmd = cmds[words[0]];
        if(cmd === null || cmd === undefined){
            console.log('Unknown command');
            rl.prompt();
            return;
        }
        
        try{
            console.log('\n');
            cmd.callback(cmds);
        }catch(e){
            console.log('ERROR: ' + e)
        }
        
        console.log('\n');
        rl.prompt();
    });
}