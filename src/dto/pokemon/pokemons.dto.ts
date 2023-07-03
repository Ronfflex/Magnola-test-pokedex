// PokemonDTO.ts
export interface Pokemons {
  name: string;
  url: string;
}

export interface PokemonsDTO {
  count: number;
  next: string;
  previous: string;
  results: Pokemons[];
}
