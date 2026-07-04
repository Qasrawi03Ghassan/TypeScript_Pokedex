import {Cache} from './../cache/poke_cache.js';

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache = new Cache(5 * 60 * 1000);
  
  constructor() {}

  async fetchPokemon(PokemonName: string): Promise<Pokemon>{
    let fullURL = `${PokeAPI.baseURL}/pokemon/${PokemonName}`;
    let resp = await fetch(fullURL,{
      method:"GET"
    });

    return await resp.json();    
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let fullURL = pageURL === undefined ? `${PokeAPI.baseURL}/location-area` : `${pageURL}`;

    const cachedRes = this.#cache.get<ShallowLocations>(fullURL);
    if(cachedRes !== undefined){
      return cachedRes;
    }

    let resp =  await fetch(fullURL,{
        method:"GET"
    });

    const data = await resp.json();
    this.#cache.add(fullURL,data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    let fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cacheRes = this.#cache.get<Location>(fullURL);
    if(cacheRes !== undefined)return cacheRes;


    let resp =  await fetch(fullURL,{
        method:"GET"
    });
    const data = await resp.json();
    this.#cache.add(fullURL,data);
    return data;
  }
}

export type ShallowLocations = {
  count: number,
  next: string | null,
  previous: string | null,
  results: {
    name:string,
    url: string,
  }[]
};

export type Location = {
  pokemon_encounters:{
    pokemon:{
      name:string
    }
  }[]
};

export type Pokemon = {
  name:string,
  base_experience:number
  height:number,
  weight:number,
  stats:{
    stat:{
      name:string
    },
    base_stat:number
  }[],
  types:{
    type:{
      name:string
    }
  }[]
}