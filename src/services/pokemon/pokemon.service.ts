import axios from "axios";
import { PokemonDTO, PokemonsDTO } from "../../dto";
import { type } from "os";

export class PokemonService {
  /* Get all pokemons */
  static async getPokemons(num: number): Promise<PokemonsDTO> {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${num}`
      );
      if (response.data) {
        return response.data;
      }
    } catch (err: any) {
      console.error(`Failed to fetch Pokemon data: ${err.message}`);
      throw err;
    }
    throw new Error("Response data is not in the expected format");
  }

  /* Get a single pokemon */
  static async getPokemon(name: string): Promise<PokemonDTO> {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      if (response.data) {
        return response.data;
      }
      throw new Error("Response data is not in the expected format");
    } catch (err: any) {
      console.error(`Failed to fetch Pokemon data: ${err.message}`);
      throw err;
    }
  }

  /* Get pokemon of getPokemons */
  static async getPokemonOfPokemons(
    pokemons: PokemonsDTO
  ): Promise<PokemonDTO[]> {
    try {
      const promises = pokemons.results.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return response.data;
      });
      const results = await Promise.all(promises);
      return results;
    } catch (err: any) {
      console.error(`Failed to fetch Pokemon data: ${err.message}`);
      throw err;
    }
  }

  /* Get pokemon types */
  static async getTypes(): Promise<string[]> {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      if (response.data) {
        return response.data.results.map((type: any) => type.name);
      }
      throw new Error("Response data is not in the expected format");
    } catch (err: any) {
      console.error(`Failed to fetch Pokemon types: ${err.message}`);
      throw err;
    }
  }

  /* Get pokemon abilities */
  static async getAbilities(): Promise<string[]> {
    const response = await axios.get("https://pokeapi.co/api/v2/ability");
    if (response.data) {
      return response.data.results.map((ability: any) => ability.name);
    }
    throw new Error("Response data is not in the expected format");
  }
  catch(err: any) {
    console.error(`Failed to fetch Pokemon ability: ${err.message}`);
    throw err;
  }
}
