export type CLIcommand = {
    name: string,
    description: string,
    callback: (commands: Record<string, CLIcommand>) => void;
};

export function getCommands(): Record<string, CLIcommand>{
    return {

        
        help:{
            name:"help",
            description:"Displays a help message",
            callback: commandHelp,
        },
        exit:{
            name:"exit",
            description:"Exit the Pokedex",
            callback: commandExit,
        }
    };
}

export function commandExit(){
    console.log('Closing the Pokedex... Goodbye!');
    process.exit(0);
}

export function commandHelp(){
    console.log('Welcome to the Pokedex!\n');
    console.log('Usage:\n\n');
    
    let cmds = getCommands();
    for(let cmd of Object.values(cmds)){
        console.log(`${cmd.name}: ${cmd.description}`);
    }
}