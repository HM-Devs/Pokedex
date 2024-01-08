const search = document.querySelector('#pokesearch');
const number = document.querySelector('#number');
const pokemonImage = document.querySelector('#pokemon-image');
const types = document.querySelector('#types');
const statNumber = document.querySelectorAll('.stat-number');

const typeColors = {
    "rock":     [182, 158,  49],
    "ghost":    [112,  85, 155],
    "steel":    [183, 185, 208],
    "water":    [100, 147, 235],
    "grass":    [116, 203,  72],
    "psychic":  [251,  85, 132],
    "ice":      [154, 214, 223],
    "dark":     [117,  87,  76],
    "fairy":    [230, 158, 172],
    "normal":   [170, 166, 127],
    "fighting": [193,  34,  57],
    "flying":   [168, 145, 236],
    "poison":   [164,  62, 158],
    "ground":   [222, 193, 107],
    "bug":      [167, 183,  35],
    "fire":     [245, 125,  49],
    "electric": [249, 207,  48],
    "dragon":   [112,  55, 255]
}

const  fetchApi = async (pkmnName) => {
    //Joining pokemon that have more than one word in their name (nidoran-f)
    pkmnApiName = pkmnName.split(' ').join('-');


    const response = await fetch
        ('https://pokeapi.co/api/v2/pokemon/' + pkmnApiName);

    if (response.status === 200) {
        const pkmnData = await response.json();
        return pkmnData;
    }
    return false;
}


search.addEventListener('change', async (event) => {
    const pkmnData = await fetchApi(event.target.value);

    //Validation handling for pokemon that do not exist
    if(!pkmnData) alert('Pokémon does not exist, please enter a valid Pokémon.');

    console.log(pkmnData);

    //Set pokemon #id at top of page
    number.innerHTML = '#' + pkmnData.id.toString().padStart(3,'0');

    //Sets pokemon image
    pokemonImage.src = pkmnData.sprites.other.home.front_default;

    //Update pokemon type colours
    types.innerHTML = '';

    pkmnData.types.forEach((t) => {
        let newType = document.createElement('span');
        let color =typeColors[t.type.name];

        newType.innerHTML = t.type.name;
        newType.classList.add('type');
        newType.style.backgroundColor = `rgb(${color[0]},${color[1]}, ${color[2]})`;

        types.appendChild(newType);[]
    });

    console.log(statNumber);

    pkmnData.stats.forEach((s,i) => {
         statNumber[i].innerHTML = s.base_stat;
    });

});
