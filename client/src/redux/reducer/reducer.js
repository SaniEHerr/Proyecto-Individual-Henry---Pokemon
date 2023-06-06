import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAIL,
  GET_POKEMON_NAME,
  FILTERED_POKEMONS,
  ORDERED_POKEMONS,
  GET_TYPES,
  ADD_POKEMON,
} from "../actions-types/actions-types";

const initialState = {
  pokemons: [],
  pokemonDetail: [],
  orderedPokemons: [],
  filteredPokemons: [],
  searchedPokemon: [],
  types: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload,
      };

    case GET_POKEMON_NAME:
      return {
        ...state,
        searchedPokemon: action.payload,
      };

    case GET_TYPES: {
      return {
        ...state,
        types: action.payload,
      };
    }

    case ADD_POKEMON: {
      return {
        ...state,
        // pokemons: [...state.pokemons, action.payload],
        pokemons: action.payload,
      };
    }

    case FILTERED_POKEMONS: {
      // Distructuring de "origin" y "type" desde action.payload
      const { origin, type } = action.payload;

      // Inicialice filteredPokemons con el valor de state.pokemons, lo cual me asegura que si no se aplican filtros, filteredPokemons contendrá todos los Pokémon sin filtrar
      let filteredPokemons = state.pokemons;

      // Condicionales infinitas jajaja
      // Hago la logica del filtrado de los Pokemons segun la combinacion de origin y type:
      //----// -> Si ORIGIN === "API", se filtran los Pokemons segun type y si tienen un id entero.
      //----// -> Si ORIGIN === "DATABASE", se filtran los Pokemons segun type y si no tienen un id entero.
      //----// -> Si ORIGIN === "ANY", simplemente se filtran los Pokémon segun type.
      // Si no se cumple ninguna de las condiciones anteriores, filteredPokemons va a quedar sin cambios

      // === Si "Origin" es igual a "Api", hago un filtrado adicional basado en el valor de type
      if (origin === "Api") {
        // Si "type" no es igual a "All", se filtran lso Pokenons segun el tipo especificado por type y su id es un numero entero
        if (type !== "All") {
          filteredPokemons = state.pokemons.filter(
            (pokemon) =>
              pokemon.types.includes(type) && Number.isInteger(pokemon.id)
          );
          // Si "type" es igual a "All", se filtran los Pokenons segun si su id es un numero entero
        } else {
          filteredPokemons = state.pokemons.filter((pokemon) =>
            Number.isInteger(pokemon.id)
          );
        }
        // === Si "origin" es igual a "Database", hago un filtrado adicional basado en type
      } else if (origin === "Database") {
        // Si "type" no es igual a "All", se filtran lso Pokenons segun el tipo especificado por type y su id NO es un numero entero
        if (type !== "All") {
          filteredPokemons = state.pokemons.filter(
            (pokemon) =>
              pokemon.types.includes(type) && !Number.isInteger(pokemon.id)
          );
          // Si "type" es igual a "All", se filtran los Pokemons segun si su id no es un numero entero
        } else {
          filteredPokemons = state.pokemons.filter(
            (pokemon) => !Number.isInteger(pokemon.id)
          );
        }
        // === Si "origin" es igual a "Any", hago un filtrado adicional basado en type.
      } else if (origin === "Any") {
        //  Si "type" no es igual a "All", se filtran los Pokemons segun si tienen el tipo especificado por type
        if (type !== "All") {
          filteredPokemons = state.pokemons.filter((pokemon) =>
            pokemon.types.includes(type)
          );
        }
        // No meti un else porque si "type" es igual a "All", no se hace ningun filtrado adicional y filteredPokemons permanece sin cambios
      }

      // Lo de siempre, se retorna un nuevo objeto con la copia del state y el estado "filteredPokemons".
      return {
        ...state,
        filteredPokemons,
      };
    }

    case ORDERED_POKEMONS: {
      const { payload } = action;

      // Si "payload" es igual a "NoOrder", se devuelve un nuevo state con orderedPokemons establecido como un array vacío
      if (payload === "NoOrder") {
        return {
          ...state,
          orderedPokemons: [],
        };
      }

      // Creamos una variable donde se crea una copia del array state.filteredPokemons, lo cual nos asegura que no estamos modificando el array original
      let orderPokemons = [...state.filteredPokemons];

      // Hago un bloque switch para manejar diferentes valores de payload. Para cada caso, realizo una operacion de ordenamiento en el array orderPokemons utilizando sort()
      switch (payload) {
        case "A-Z":
          // Uso localeCompare() para ordenar los Pokemons por nombre en orden alfabetico ascendente
          orderPokemons.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "Z-A":
          // Aca lo mismo pero hago una comparacion inversa usando localeCompare() para obtener el orden alfabetico descendente
          orderPokemons.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "Asc":
          // Se ordenan los Pokemons por ataque de forma ascendente, usando la diferencia a.attack - b.attack.
          orderPokemons.sort((a, b) => a.attack - b.attack);
          break;
        case "Desc":
          // Se ordenan los Pokemons por ataque de forma descendente, usando la diferencia b.attack - a.attack.
          orderPokemons.sort((a, b) => b.attack - a.attack);
          break;

        default:
          break;
      }

      // Lo de casi siempre; se devuelve un nuevo state con orderedPokemons establecido como una copia del array orderPokemons ordenado
      return {
        ...state,
        orderedPokemons: orderPokemons,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
