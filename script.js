const pokemonContainer = document.querySelector("#pokeContainer");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const pokemonPage = 18;
let currentPage = 1;
const pokemonCount = 300

const colors = {
        fire: '#FDDFDF', grass: '#DEFDE0', electric: '#FCF7DE', water: '#DEF3FD',
        ground: '#f4e7da', rock: '#d5d5d4', fairy: '#fceaff', poison: '#98d7a5',
        bug: '#f8d5a3', dragon: '#97b3e6', psychic: '#edd5ff', flying: '#F5F5F5',
        fighting: '#E6E0D4', normal: '#F5F5F5'
    }
    
    const mainTypes = Object.keys(colors);  
    const totalPokemon = pokemonCount;

    async function fetchPokemon(id) {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
            const resp = await fetch(url);
            const data = await resp.json();
            createPokemonCard(data);        
        } catch (error) {
            console.error("Erro ao carregar pokemon", error);
            pokemonContainer.innerHTML = "Erro ao carregar pokemon";
        }
    }
    
    async function getPokemon(page) {
        try{ 
            pokemonContainer.innerHTML = "Carregando...";
            const start = (page - 1) * pokemonPage + 1;
            const end = Math.min(start + pokemonPage - 1, pokemonCount);
            pokemonContainer.innerHTML = "";
            for (let i = 1; i <= pokemonPage; i++) {
                await fetchPokemon(start + i - 1)
            }


        } catch (error) {
            console.error("Erro ao carregar pokemon", error);
            pokemonContainer.innerHTML = "Erro ao carregar pokemon";
        }
    }

    
    function createPokemonCard(poke) {
        const card = document.createElement('div')
        card.classList.add("pokemon")
        
        const pokeName = poke.name
        const pokeId = poke.id
        const pokeTypes = poke.types.map(type => type.type.name)
        const type = mainTypes.find(type => pokeTypes.includes(type))
        const color = colors[type]
        
        let gifUrl = poke.sprites.versions?.["generation-v"]?.["black-white"]?.animated?.front_default;
        if (gifUrl == null) {
            gifUrl = poke.sprites.front_default;
        }

    card.style.backgroundColor = color

    // <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${pokeName}">

    const pokemonInnerHTML = `
    <div class="imgContainer">
        <img src="${gifUrl}" alt="${pokeName}">
    </div>
    <div class="info">
        <span class="number">#${pokeId}</span>
        <h3 class="name">${pokeName}</h3>
        <small class="type">Type: <span>${pokeTypes}</span></small>
    </div>
    `;

    card.innerHTML = pokemonInnerHTML;

    card.addEventListener("click", () => {
        window.location.href = `pokemon.html?id=${poke.id}`;
    })

    pokemonContainer.appendChild(card);
}

prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage -= 1;
        getPokemon(currentPage);
    }
});

nextButton.addEventListener("click", () => {
        currentPage += 1;
        getPokemon(currentPage);
});

function loadPokemon(page) {
    getPokemon(page);
}

loadPokemon(currentPage);
