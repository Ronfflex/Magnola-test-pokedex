// PokemonList.tsx
import { useState, useEffect } from "react";
import { PokemonService } from "../../services";
import { Pokemons, PokemonsDTO } from "../../dto";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Pokemon25 = () => {
  const [pokemonData, setPokemonData] = useState<PokemonsDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PokemonService.getPokemons(25);
        setPokemonData(data);
      } catch (err: any) {
        setError("Failed to load Pokemon data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  if (error) return <div>{error}</div>;
  if (!pokemonData) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {pokemonData.results.map((pokemons: Pokemons) => (
        <Link to={"/pokemon/" + pokemons.name}>
          <div
            key={pokemons.name}
            className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden cursor-pointer"
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                pokemons.url.split("/")[pokemons.url.split("/").length - 2]
              }.png`}
              alt={pokemons.name}
              className="w-32 h-32 mt-4"
            />
            <h2 className="text-lg font-bold mb-4">{pokemons.name}</h2>
          </div>
        </Link>
      ))}
      <div
        onClick={() => {
          window.location.href = `/pokemons/`;
        }}
        className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden cursor-pointer"
      >
        <QuestionMarkCircleIcon className="w-32 h-32 mt-4" />
        <h2 className="text-lg font-bold mb-4">See more...</h2>
      </div>
    </div>
  );
};

export default Pokemon25;
