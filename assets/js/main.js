const pokemonListHtml = document.getElementById('pokemonListHtml');
const loadMoreBtn = document.getElementById('loadMoreBtn');

const maxPokemonsShown = 15;
const limit = 10;
let offset = 0;


// Function to load the Pokémon list
function loadPokemonsList(offset, limit) {
    //Convert each pokemon from the 'pokemonList' in a HTML list item and add then to the HTML pokemon list
    PokeAPI.getPokemonList(offset, limit).then((pokemonsList = []) => {
        // Convert the 'pokemonsList' from the PokeAPI request to the HTML list using the .map function
        // Join the new HTML list without separators using the .join function
        // Insert the new HTML Pokémon list into the HTML list using the .innerHTML function
        pokemonListHtml.innerHTML += pokemonsList.map((pokemon) => `
            <li class="pokemon ${pokemon.mainType}">
                <a href="./detail.html?id=${pokemon.id}">
                    <span class="number">#${pokemon.id}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                        </ol>

                        <img src="${pokemon.picture}" alt="${pokemon.name} picture">
                    </div>
                </a>
            </li>
        `).join('')
    });
}

// First load Pokémon list
loadPokemonsList(offset, limit);

// "Load more" button action
loadMoreBtn.addEventListener('click', () => {
    const pokemonsShownInNextPage = offset + limit;
    offset += limit;

    if (pokemonsShownInNextPage >= maxPokemonsShown) {
        const newPokemonsShown = maxPokemonsShown - offset;

        loadPokemonsList(offset, newPokemonsShown);

        loadMoreBtn.parentElement.removeChild(loadMoreBtn);
    } else {
        loadPokemonsList(offset, limit);
    }
})