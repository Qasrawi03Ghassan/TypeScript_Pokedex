# Pokedex

This repository features the second project of the **Boot.dev** stage with **FTS** internship program which is building a **Pokedex** in a command-line **REPL** (Read-Evaluate-Print Loop) built using node and TypeScript.  

## Requirements  

You need to have latest version of node and npm installed for this project to run correctly. After installing them install the required modules via:  

```
npm install
```

## Usage  

Type one of the commands listed in the Features section:  

```
Pokedex > <command>
```

note that entering a non valid command will show `unknown command` message.

## Features  

The Pokedex supports a range of commands and features listed below:  
* `map` : Displays the names of 20 location areas in the Pokemon world. Reuse for next page.
* `mapb` : Displays the names of 20 location areas in the Pokemon world for previuos page.
* `explore <location_name>` : Displays a list of all the Pokemon in a specified area.
* `catch <Pokemon_name>` : Adds a pokemon to the user's pokedex.
* `inspect <Pokemon_name>` : Checks the stats for a previously caught Pokemon.
* `pokedex` : Displays a list of all previously captured Pokemon.
* `help` : Displays a help message.
* `exit` : Exit the Pokedex.

---

Author: Ghassan Qasrawi  
Boot.dev handle: @ghassan-qasrawi ([Account link](https://www.boot.dev/u/ghassan-qasrawi))