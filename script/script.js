const search = document.querySelector('#pokesearch');
const number = document.querySelector('#number');
const pokemonImage = document.querySelector('#pokemon-image');

const  fetchApi = async (pkmnName) => {
    const response = await fetch
        ('https://pokeapi.co/api/v2/pokemon/' + pkmnName.toLowerCase());
    
    const pkmnData = await response.json();
    return pkmnData;
}


search.addEventListener('change', async (event) => {
    const pkmnData = await fetchApi(event.target.value);

    console.log(pkmnData);

    //Set pokemon #id at top of page
    number.innerHTML = '#' + pkmnData.id.toString().padStart(3,'0');

    //Sets pokemon image
    pokemonImage.src = pkmnData.sprites.other.home.front_default;
});
