export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let fullURL = pageURL === undefined ? `${PokeAPI.baseURL}/location-area` : `${pageURL}`;
    let resp =  await fetch(fullURL,{
        method:"GET"
    });

    return await resp.json();
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