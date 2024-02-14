export const typeColors = {
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
  };
  
  export class PokemonService {
    constructor() {
      this.pkmnData = null;
      this.typeColors = typeColors;
    }
  
    async fetchApi(pkmnName) {
      const pkmnApiName = pkmnName.split(' ').join('-').toLowerCase();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnApiName}`);
  
      if (response.status === 200) {
        this.pkmnData = await response.json();
        return this.pkmnData;
      }
  
      return null;
    }
  
    getTypeColor(typeName) {
      return this.typeColors[typeName];
    }
  }