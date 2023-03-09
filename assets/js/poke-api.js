const PokeAPI = {};

// Convert the PokeAPI Pokémon model to our Pokémon model (pokemon-model.js)
function convertPokemonModel(pokeApiPokemon) {
    const pokemon = new Pokemon();

    pokemon.id = pokeApiPokemon.id;
    pokemon.name = pokeApiPokemon.name;

    const types = pokeApiPokemon.types.map((typeSlot) => typeSlot.type.name);
    const [mainType] = types;

    pokemon.types = types;
    pokemon.mainType = mainType;
    pokemon.picture = pokeApiPokemon.sprites.other.dream_world.front_default;
    pokemon.abilities = pokeApiPokemon.abilities.map((abilitieSlot) => abilitieSlot.ability.name);
    pokemon.height = pokeApiPokemon.height;
    pokemon.weight = pokeApiPokemon.weight;
    pokemon.stats['health'] = pokeApiPokemon.stats[0].base_stat;
    pokemon.stats['attack'] = pokeApiPokemon.stats[1].base_stat;
    pokemon.stats['defense'] = pokeApiPokemon.stats[2].base_stat;
    pokemon.stats['spAttack'] = pokeApiPokemon.stats[3].base_stat;
    pokemon.stats['spDefense'] = pokeApiPokemon.stats[4].base_stat;
    pokemon.stats['speed'] = pokeApiPokemon.stats[5].base_stat;
    pokemon.stats['total'] = pokemon.stats['health'] + pokemon.stats['attack'] +
    pokemon.stats['defense'] + pokemon.stats['spAttack'] +
    pokemon.stats['spDefense'] + pokemon.stats['speed']

    return pokemon;
}

// Create method to retrieve the Pokémon details list from the PokeAPI and convert it to our Pokémon model (pokemon-model.js)
PokeAPI.getPokemonDetailsList = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemonModel);
}

// Create method to retrieve the Pokémons list from the PokeAPI
PokeAPI.getPokemonList = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    // Request URL to PokeAPI and return the result to the function
    return fetch(url)
        .then((response) => response.json()) // Capture the response body and convert it to json
        .then((jsonBody) => jsonBody.results) // Return only the 'results' section (Pokémons list) from the response body json
        .then((pokemonsList) => pokemonsList.map(PokeAPI.getPokemonDetailsList)) // Return one request for each Pokémon on the Pokémons list
        .then((pokemonDetailsListRequests) => Promise.all(pokemonDetailsListRequests)) // Multiple request each Pokémon details list
        .then((pokemonDetailsList) => pokemonDetailsList) // Return all the Pokémon details lists
        .catch((error) => console.error(error)); // If error, print the error in the console
}