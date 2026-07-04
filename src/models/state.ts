import { createInterface, type Interface } from "readline";
import { getCommands } from "../utils/repl_commands.js";
import { PokeAPI, Pokemon } from "../apis/pokeapi.js";

export type State = {
    interface : Interface,
    pokeapi:PokeAPI,
    caughtPokemon: Map<string,Pokemon>
    nextLocationsUrl: string | undefined,
    prevLocationsUrl: string | undefined
    commands: Record<string,CLIcommand>
}

export type CLIcommand = {
    name: string,
    description: string,
    callback: (state: State, ...args:string[]) => Promise<void>;
};

export function initState(): State{

    const rl = createInterface({
        input:process.stdin,
        output:process.stdout,
        prompt:"Pokedex > "
    });

    const cmds = getCommands();

    return {interface:rl,pokeapi: new PokeAPI(),nextLocationsUrl:undefined,prevLocationsUrl:undefined,commands:cmds,caughtPokemon: new Map()};

}
