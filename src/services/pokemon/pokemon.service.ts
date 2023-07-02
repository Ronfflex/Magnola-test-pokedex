import axios from "axios";
import { PokemonDTO } from "../../dto";

export class PokemonService {
  static async getPokemons(num:number): Promise<PokemonDTO> {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${num}`
      );
      if (Array.isArray(response.data.results)) {
        return response.data;
      }
    } catch (err: any) {
      console.error(`Failed to fetch Pokemon data: ${err.message}`);
      throw err;
    }
    throw new Error("Response data is not in the expected format");
  }
}
