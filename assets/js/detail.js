const pokemon = new URLSearchParams(location.search).get('id');
const pokemonDetailContent = document.getElementById('pokemonDetailContent');

function loadPokemonDetails(pokemonId) {

    PokeAPI.getPokemonDetails(pokemonId).then((pokemon) => {
        pokemonDetailContent.innerHTML = `
        <section class="content mod-background ${pokemon.mainType}">
            <nav class="navbar">
                <a href="./index.html">←</a>
            </nav>

            <div id="pokemonInfoDiv" class="pokemon-info">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.picture}"
                        alt="${pokemon.name} picture">
                </div>
            </div>
        </section>

        <section class="mod-pokemon-detail ${pokemon.mainType}">
            <div class="content pokemon-detail">
                <div class="pokemon-stats">
                    <h2>About</h2>
                    <ol class="pokemon-stats-list">
                        <li class="stat">
                            <span class="stat-name">height:</span>
                            <span>${pokemon.height} m</span>
                        </li>
                        <li class="stat">
                            <span class="stat-name">weight:</span>
                            <span>${pokemon.weight} kg</span>
                        </li>
                        <li class="stat">
                            <span class="stat-name">abilities:</span>
                            <span class="stat-value">${pokemon.abilities.map((abilitie) => abilitie).join(', ')}</span>
                        </li>
                    </ol>

                    <h2>Base Stats</h2>
                    <ol class="pokemon-stats-list">
                        <li class="stat">
                            <span class="stat-name">HP:</span>
                            <span>${pokemon.stats['health']}</span>
                        </li>
                        <li class="stat">
                            <span class="stat-name">attack:</span>
                            <span>${pokemon.stats['attack']}</span>
                        </li>
                        <li class="stat">
                            <span class="stat-name">defense:</span>
                            <span>${pokemon.stats['defense']}</span>
                        </li>
                        <li class="stat">
                            <span class="stat-name">sp. attack:</span>
                            <span>${pokemon.stats['spAttack']}</span>
                        </li>
                        <li class="stat">
                            <span class="stat-name">sp. defense:</span>
                            <span>${pokemon.stats['spDefense']}</span>
                        </li>
                        <li class="stat">
                            <span class="stat-name">speed:</span>
                            <span>${pokemon.stats['speed']}</span>
                        </li>
                        <li class="stat">
                            <span class="stat-name">total:</span>
                            <span>${pokemon.stats['total']}</span>
                        </li>
                    </ol>
                </div>
            </div>
        </section>
        `
    })
    
}

loadPokemonDetails(pokemon);