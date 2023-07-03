export interface PokemonDTO {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: AbilityDTO[];
  types: TypeDTO[];
  species: Species;
  sprites: Sprites;
}

export interface AbilityDTO {
  ability: Ability;
}

export interface Ability {
  name: string;
  url: string;
}

export interface TypeDTO {
  slot: number;
  type: Type;
}

export interface Type {
  name: string;
  url: string;
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  front_default: string;
}
