import { PokemonService, typeColors } from './services/pokemonService.js';
import { UIUpdater } from './ui/UIUpdater.js';

const pokemonService = new PokemonService();
const uiUpdater = new UIUpdater(pokemonService, typeColors);

const search = document.querySelector('#pokesearch');
const shiny = document.querySelector('#shiny');
const number = document.querySelector('#number');
const pokemonImage = document.querySelector('#pokemon-image');
const types = document.querySelector('#types');
const statNumber = document.querySelectorAll('.stat-number');
const barInner = document.querySelectorAll('.bar-inner');
const barOuter = document.querySelectorAll('.bar-outer');
const statDesc = document.querySelectorAll('.stat-desc');
const statTitle = document.querySelector('#stat-title');
const pokedex = document.querySelector('#pokedex');

const updateUI = (mainColor) => {
  uiUpdater.updateUI(statTitle, pokemonImage, types, statNumber, barInner, barOuter, 
                        statDesc, number, pokedex, shiny);
};

const fetchAndDisplayPokemon = async (pkmnName) => {
  const pkmnData = await pokemonService.fetchApi(pkmnName);

  if (!pkmnData) {
    alert('Hey bud, that Pokémon does not exist - quit foolin around!');
    return;
  }

  const mainColor = typeColors[pkmnData.types[0].type.name];
  updateUI(mainColor);
  shiny.classList.remove('active');
};

search.addEventListener('change', (event) => {
  fetchAndDisplayPokemon(event.target.value);
});

shiny.addEventListener('click', () => {
    console.log('Shiny button clicked');
    if (pokemonService.pkmnData) {
      shiny.classList.toggle('active');
  
      const mainColor = typeColors[pokemonService.pkmnData.types[0].type.name];
      const spriteType = shiny.classList.contains('active') ? 'front_shiny' : 'front_default';
      console.log('Sprite type:', spriteType);
      
      updateUI(mainColor);
  
      // Update the sprite based on shiny state
      pokemonImage.src = pokemonService.pkmnData.sprites.other.home[spriteType];
    }
  });


