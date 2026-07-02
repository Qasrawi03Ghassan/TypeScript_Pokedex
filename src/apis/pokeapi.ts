import {Cache} from './../cache/poke_cache.js';

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache = new Cache(5 * 60 * 1000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let fullURL = pageURL === undefined ? `${PokeAPI.baseURL}/location-area` : `${pageURL}`;

    const cachedRes = this.#cache.get<ShallowLocations>(fullURL);
    if(cachedRes !== undefined){
      console.log('cache hit');
      return cachedRes;
    }

    console.log('cache miss');
    let resp =  await fetch(fullURL,{
        method:"GET"
    });

    const data = await resp.json();
    this.#cache.add(fullURL,data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    let fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    let resp =  await fetch(fullURL,{
        method:"GET"
    });

    return await resp.json();
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
  // add properties here
};