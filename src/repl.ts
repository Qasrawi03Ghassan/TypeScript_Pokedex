import {createInterface} from "readline";

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
        
        console.log(`Your command was: ${words[0]}`);
        rl.prompt();
    });
}