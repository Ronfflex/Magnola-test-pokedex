import axios from "axios";
import { PokemonDTO, PokemonsDTO } from "../../dto";

export class PokemonService {
  static async getPokemons(num:number): Promise<PokemonsDTO> {
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

  static async getPokemon(name: string): Promise<PokemonDTO> {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (response.data){
        return response.data;
      }
      throw new Error("Response data is not in the expected format");
    } catch (err: any) {
      console.error(`Failed to fetch Pokemon data: ${err.message}`);
      throw err;
    }
  }
}
