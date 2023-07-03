import { useState, useEffect } from "react";
import { PokemonService } from "../../services";
import { PokemonsDTO, PokemonDTO } from "../../dto";
import { Link } from "react-router-dom";

const PokemonAll = () => {
  const [pokemonData, setPokemonData] = useState<PokemonsDTO | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDTO[] | null>(
    null
  );
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [pokemonAbilities, setPokemonAbilities] = useState<string[]>([]);

  const [searchName, setSearchName] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("");
  const [searchAbility, setSearchAbility] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PokemonService.getPokemons(150);
        setPokemonData(data);

        setLoading(true);
        
        const details = await PokemonService.getPokemonOfPokemons(data);
        setPokemonDetails(details);

        const types = await PokemonService.getTypes();
        setPokemonTypes(types);

        const abilities = await PokemonService.getAbilities();
        setPokemonAbilities(abilities);

        setLoading(false);
      } catch (err: any) {
        setError("Failed to load Pokemon data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const filteredPokemons =
    pokemonDetails?.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchName.toLowerCase().trim()) &&
        pokemon.types.some((type) =>
          type.type.name.toLowerCase().includes(searchType.toLowerCase().trim())
        ) &&
        pokemon.abilities.some((ability) =>
          ability.ability.name
            .toLowerCase()
            .includes(searchAbility.toLowerCase().trim())
        )
    ) || [];

  if (error)
    return <div className="text-red-600 text-center mt-4">{error}</div>;
  if (!pokemonData) return <div className="text-center mt-4">Loading Pokemons...</div>;
  if (loading)
    return <div className="text-center mt-4">Loading elements...</div>;

  return (
    <div className="text-center">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="appearance-none border rounded my-2 mx-4 py-2 pl-3 pr-24 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />

      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="appearance-none border rounded my-2 mx-4 py-2 pl-3 pr-24 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">-- select a type --</option>
        {pokemonTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={searchAbility}
        onChange={(e) => setSearchAbility(e.target.value)}
        className="appearance-none border rounded my-2 mx-4 py-2 pl-3 pr-24 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">-- select an ability --</option>
        {pokemonAbilities.map((ability) => (
          <option key={ability} value={ability}>
            {ability}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredPokemons.map((pokemon: PokemonDTO) => (
          <Link to={"/pokemon/" + pokemon.name}>
            <div
              key={pokemon.name}
              className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden cursor-pointer"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                className="w-32 h-32 mt-4"
              />
              <h2 className="text-lg font-bold mb-4">{pokemon.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonAll;
