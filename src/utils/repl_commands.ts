import { CLIcommand, State } from "../models/state.js";

export function getCommands(): Record<string, CLIcommand>{
    return {
        map:{
            name:"map",
            description:"Displays the names of 20 location areas in the Pokemon world. Reuse for next page",
            callback: commandMap
        },
        mapb:{
            name:"mapb",
            description:"Displays the names of 20 location areas in the Pokemon world for previuos page",
            callback: commandMapBack
        },
        explore:{
            name:`explore <location_area>`,
            description:"Displays a list of all the Pokemon in a specified area",
            callback: commandExplore
        },
        catch:{
            name:`catch <pokemon_name>`,
            description:"Adds a pokemon to the user's pokedex",
            callback: commandCatch
        },
        inspect:{
            name:`inspect <pokemon_name>`,
            description:"Checks the stats for a previously caught Pokemon",
            callback: commandInspect
        },
        pokedex:{
            name:`pokedex`,
            description:"Displays a list of all previously captured Pokemon",
            callback: commandPokedex
        },
        help:{
            name:"help",
            description:"Displays a help message",
            callback: commandHelp
        },
        exit:{
            name:"exit",
            description:"Exit the Pokedex",
            callback: commandExit
        }
    };
}

export async function  commandCatch(state: State,...args: string[]) : Promise<void>{

    let pokemeon = state.caughtPokemon.get(args[0]);
    if(pokemeon !== undefined)console.log(`You have already caught ${args[0]}!`);
    else{
        console.log(`Throwing a Pokeball at ${args[0]}...`);
        let pokemon = await state.pokeapi.fetchPokemon(args[0]);
        if(pokemon === null || pokemon === undefined) console.log(`ERROR: Can\'t get ${args[0]} data.`);

        const roll = Math.floor(Math.random() * pokemon.base_experience);
        if(roll < 100){
            state.caughtPokemon.set(args[0],pokemon);
            console.log(`${args[0]} was caught!`);
            console.log('You may now inspect it with the inspect command.');
        }else{
            console.log(`${args[0]} escaped!`);
        }
    }
}

export async function  commandPokedex(state: State) : Promise<void>{
    if(state.caughtPokemon.size === 0) console.log('You have not caught any Pokemon yet!');
    else{
        console.log('Your Pokedex:');
        state.caughtPokemon.forEach((pokemon) => {
        console.log(`  - ${pokemon.name}`);
    });
    }
}


export async function  commandInspect(state: State,...args: string[]) : Promise<void>{
    let pokemeon = state.caughtPokemon.get(args[0]);
    if(pokemeon === undefined)console.log(`You have not caught ${args[0]} yet!`);
    else{
        console.log(`Name: ${pokemeon.name}`);
        console.log(`Height: ${pokemeon.height}`);
        console.log(`Weight: ${pokemeon.weight}`);
        
        console.log('Stats: ');
        for(let statObject of pokemeon.stats){
            console.log(`   -${statObject.stat.name}: ${statObject.base_stat}`);
        }

        console.log('Types: ');
        for(let typeObject of pokemeon.types){
            console.log(`   - ${typeObject.type.name}`);
        }
    }
}

export async function  commandExplore(state: State,...args: string[]) : Promise<void>{
    console.log(`Exploring ${args[0]}...`);
    let location = await state.pokeapi.fetchLocation(args[0]);

    if(location === null || location === undefined) console.log(`ERROR: Can\'t get ${args[0]} data.`);

    console.log('Found Pokemon:');
    
    for(let pokemonCreature of location.pokemon_encounters){
        console.log(`- ${pokemonCreature.pokemon.name}`);
    }
}

export async function  commandMap(state: State) : Promise<void>{
    let locations = await state.pokeapi.fetchLocations(state.nextLocationsUrl);
    
    state.nextLocationsUrl = locations.next ?? undefined;
    state.prevLocationsUrl = locations.previous ?? undefined;

    for(let location of locations.results){
        console.log(location.name);
    }
}

export async function  commandMapBack(state: State) : Promise<void>{
    let locations = await state.pokeapi.fetchLocations(state.prevLocationsUrl);
    
    state.nextLocationsUrl = locations.next ?? undefined;
    state.prevLocationsUrl = locations.previous ?? undefined;

    for(let location of locations.results){
        console.log(location.name);
    }
}

export async function commandHelp(state:State):Promise<void>{
    console.log('Welcome to the Pokedex!\n');
    console.log('Usage:\n\n');
    
    let cmds = state.commands;
    for(let cmd of Object.values(cmds)){
        console.log(`${cmd.name}: ${cmd.description}`);
    }
}

export async function commandExit(state:State):Promise<void>{
    console.log('Closing the Pokedex... Goodbye!\n');
    process.exit(0);
}