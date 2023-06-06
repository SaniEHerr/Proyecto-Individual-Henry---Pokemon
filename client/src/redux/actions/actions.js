import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAIL,
  GET_POKEMON_NAME,
  FILTERED_POKEMONS,
  ORDERED_POKEMONS,
  GET_TYPES,
  ADD_POKEMON,
} from "../actions-types/actions-types";

import axios from "axios";

export const getAllPokemons = () => {
  return async (dispatch) => {
    const apiResponse = await axios.get("http://localhost:3001/pokemon");
    const pokemonsData = apiResponse.data;

    return dispatch({
      type: GET_ALL_POKEMONS,
      payload: pokemonsData,
    });
  };
};

export const getPokemonDetail = (pokemonId) => {
  return async (dispatch) => {
    const apiResponse = await axios.get(
      `http://localhost:3001/pokemon/${pokemonId}`
    );
    const pokemonDetail = apiResponse.data;

    return dispatch({
      type: GET_POKEMON_DETAIL,
      payload: pokemonDetail,
    });
  };
};

export const getPokemonName = (namePokemon) => {
  return async (dispatch) => {
    const apiResponse = await axios.get(
      `http://localhost:3001/pokemon/name?name=${namePokemon}`
    );
    const pokemonData = apiResponse.data;

    return dispatch({
      type: GET_POKEMON_NAME,
      payload: pokemonData,
    });
  };
};

export const getAllTypes = () => {
  return async (dispatch) => {
    const apiResponse = await axios.get("http://localhost:3001/types");
    const pokemonData = apiResponse.data;

    return dispatch({
      type: GET_TYPES,
      payload: pokemonData,
    });
  };
};

export const addPokemon = (payload) => {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/pokemon", payload);
    return dispatch({ type: ADD_POKEMON, payload: response.data });
  };
};

export const loadTypes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/types`);
      return dispatch({ type: GET_TYPES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const filteredPokemons = (type = "All", origin = "Any") => {
  return { type: FILTERED_POKEMONS, payload: type, origin };
};

export const orderedPokemons = (order = "NoOrder") => {
  return { type: ORDERED_POKEMONS, payload: order };
};
