export class UIUpdater {
    constructor(pokemonService, typeColors) {
      this.pokemonService = pokemonService;
      this.typeColors = typeColors;
    }
  
    updateUI(statTitle, pokemonImage, types, statNumber, barInner, 
                barOuter, statDesc, number, pokedex, shiny) {
      const { pkmnData } = this.pokemonService;
      const mainColor = this.typeColors[pkmnData.types[0].type.name];
  
      statTitle.style.color = `rgb(${mainColor[0]},${mainColor[1]}, ${mainColor[2]})`;
      document.getElementById('pokedex').style.backgroundColor = `rgb(${mainColor[0]},${mainColor[1]}, ${mainColor[2]})`;
      document.getElementById('shiny').style.backgroundColor = `rgb(${mainColor[0]},${mainColor[1]}, ${mainColor[2]})`;
      pokedex.style.backgroundColor = `rgb(${mainColor[0]},${mainColor[1]}, ${mainColor[2]})`;
      shiny.style.backgroundColor = `rgb(${mainColor[0]},${mainColor[1]}, ${mainColor[2]})`;
      number.innerHTML = '#' + pkmnData.id.toString().padStart(3, '0');
      pokemonImage.src = pkmnData.sprites.other.home.front_default;
  
      types.innerHTML = '';
      pkmnData.types.forEach((t) => {
          let newType = document.createElement('span');
          let color = this.typeColors[t.type.name];
  
          newType.innerHTML = t.type.name;
          newType.classList.add('type');
          newType.style.backgroundColor = `rgb(${color[0]},${color[1]}, ${color[2]})`;
  
          types.appendChild(newType);
      });
  
      pkmnData.stats.forEach((s, i) => {
          statNumber[i].innerHTML = s.base_stat.toString().padStart(2, '0');
          barInner[i].style.width = `${s.base_stat}%`;
          barInner[i].style.backgroundColor = `rgb(${mainColor[0]},${mainColor[1]}, ${mainColor[2]})`;
          barOuter[i].style.backgroundColor = `rgba(${mainColor[0]},${mainColor[1]}, ${mainColor[2]}, 0.3)`;
          statDesc[i].style.color = `rgb(${mainColor[0]},${mainColor[1]}, ${mainColor[2]})`;
      });
    }
  }