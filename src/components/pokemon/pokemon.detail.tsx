import { useParams } from "react-router-dom";
import { AbilityDTO, PokemonDTO, TypeDTO } from "../../dto";
import { useEffect, useState } from "react";
import { PokemonService } from "../../services";

function PokemonDetail() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!name) {
        setError("No Pokemon name provided.");
        return;
      }

      try {
        const data = await PokemonService.getPokemon(name);
        console.log(data);
        setPokemon(data);
      } catch (err: any) {
        setError("Failed to load Pokemon data. Please try again later.");
      }
    };

    fetchData();
  }, [name]);

  if (error)
    return <div className="text-red-600 text-center mt-4">{error}</div>;
  if (!pokemon) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center mt-8 bg-white p-4 rounded-lg shadow-md hover:shadow-lg overflow-hidden">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-32 h-32 mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{pokemon.name}</h2>
      <div className="text-left w-full">
        <table className="table-fixed w-full">
          <tbody>
            <tr className="border">
              <td className="w-1/3 p-2 font-semibold">Height</td>
              <td className="w-2/3 p-2">{pokemon.height}</td>
            </tr>
            <tr className="border">
              <td className="w-1/3 p-2 font-semibold">Weight</td>
              <td className="w-2/3 p-2">{pokemon.weight}</td>
            </tr>
            <tr className="border">
              <td className="w-1/3 p-2 font-semibold">Species</td>
              <td className="w-2/3 p-2">{pokemon.species.name}</td>
            </tr>
            <tr className="border">
              <td className="w-1/3 p-2 font-semibold">Abilities</td>
              <td className="w-2/3 p-2">
                {pokemon.abilities.map((ability: AbilityDTO, index: number) => (
                  <p key={index}>{ability.ability.name}</p>
                ))}
              </td>
            </tr>
            <tr className="border">
              <td className="w-1/3 p-2 font-semibold">Types</td>
              <td className="w-2/3 p-2">
                {pokemon.types.map((type: TypeDTO, index: number) => (
                  <p key={index}>{type.type.name}</p>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PokemonDetail;
