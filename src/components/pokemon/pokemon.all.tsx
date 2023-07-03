// PokemonList.tsx
import { useState, useEffect } from "react";
import { PokemonService } from "../../services";
import { Pokemons, PokemonsDTO } from "../../dto";
import { Link } from "react-router-dom";

const PokemonAll = () => {
  const [pokemonData, setPokemonData] = useState<PokemonsDTO | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PokemonService.getPokemons(150);
        setPokemonData(data);
      } catch (err: any) {
        setError("Failed to load Pokemon data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const filteredPokemons =
    pokemonData?.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    ) || [];

  if (error)
    return <div className="text-red-600 text-center mt-4">{error}</div>;
  if (!pokemonData) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="text-center">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="appearance-none border rounded my-2 mx-4 py-2 pl-3 pr-24 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredPokemons.map((pokemons: Pokemons) => (
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
      </div>
    </div>
  );
};

export default PokemonAll;
