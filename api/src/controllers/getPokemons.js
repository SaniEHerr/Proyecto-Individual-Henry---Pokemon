const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

// const getPokemons = async (req, res) => {
//   try {
//     const pokeApi = await axios.get(
//       "https://pokeapi.co/api/v2/pokemon?limit=100"
//     );
//     const pokeApiData = pokeApi.data.results;

//     if (!pokeApiData) throw new Error("Url Malito");

//     const pokeDB = await Pokemon.findAll();
//     const result = [...pokeApiData, ...pokeDB];

//     res.status(200).json(pokeApiData);

//     // res.status(200).send("Si entra a la ruta Pokemon");
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

// -------------------
// -------------------
// -------------------

// const getPokemons = async (req, res) => {
//   try {
//     const pokeApi = await axios.get(
//       "https://pokeapi.co/api/v2/pokemon?limit=10"
//     );
//     const pokeApiData = pokeApi.data.results;

//     if (!pokeApiData) throw new Error("Url Malito");

//     const pokeDB = await Pokemon.findAll();
//     const pokeDBData = pokeDB.map((pokemon) => ({
//       id: pokemon.id,
//       name: pokemon.name,
//       image: pokemon.image,
//       // ... otros campos
//     }));

//     const result = [...pokeApiData, ...pokeDBData];

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

// -------------------
// -------------------

// const getPokemons = async (req, res) => {
//   try {
//     const pokeApi = await axios.get(
//       "https://pokeapi.co/api/v2/pokemon?limit=10"
//     );
//     const pokeApiData = pokeApi.data.results;

//     if (!pokeApiData) throw new Error("URL Malito");

//     const pokemonDetailsPromises = pokeApiData.map(async (pokemon) => {
//       const pokemonResponse = await axios.get(pokemon.url);
//       const pokemonData = pokemonResponse.data;
//       return {
//         id: pokemonData.id,
//         name: pokemonData.name,
//         image: pokemonData.sprites.front_default,
//         types: pokemonData.types.map((type) => type.type.name),
//         hp: pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat,
//         attack: pokemonData.stats.find((stat) => stat.stat.name === "attack")
//           .base_stat,
//         defense: pokemonData.stats.find((stat) => stat.stat.name === "defense")
//           .base_stat,
//         speed: pokemonData.stats.find((stat) => stat.stat.name === "speed")
//           .base_stat,
//         weight: pokemonData.weight,
//         height: pokemonData.height,
//       };
//     });

//     const pokeDB = await Pokemon.findAll();
//     const pokeDBData = pokeDB.map((pokemon) => ({
//       id: pokemon.id,
//       name: pokemon.name,
//       image: pokemon.image,
//       types: pokemon.types,
//       hp: pokemon.hp,
//       attack: pokemon.attack,
//       defense: pokemon.defense,
//       speed: pokemon.speed,
//       weight: pokemon.weight,
//       height: pokemon.height,
//     }));

//     const result = await Promise.all([
//       ...pokemonDetailsPromises,
//       ...pokeDBData,
//     ]);

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

// ---------------
// ---------------

const getPokemons = async (req, res) => {
  try {
    const pokeApi = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    );
    const pokeApiData = pokeApi.data.results;

    if (!pokeApiData) throw new Error("URL Malito");

    const pokemonDetailsPromises = pokeApiData.map(async (pokemon) => {
      const pokemonResponse = await axios.get(pokemon.url);
      const pokemonData = pokemonResponse.data;
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        // image: pokemonData.sprites.front_default,
        image: pokemonData.sprites.other.home.front_default,
        // image: pokemonData.sprites.version.generation.red.front_default,
        types: pokemonData.types.map((type) => type.type.name),
        hp: pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat,
        attack: pokemonData.stats.find((stat) => stat.stat.name === "attack")
          .base_stat,
        defense: pokemonData.stats.find((stat) => stat.stat.name === "defense")
          .base_stat,
        speed: pokemonData.stats.find((stat) => stat.stat.name === "speed")
          .base_stat,
        weight: pokemonData.weight,
        height: pokemonData.height,
      };
    });

    const pokeDB = await Pokemon.findAll({
      include: [Type], // Incluir directamente el modelo Type
    });

    const pokeDBData = pokeDB.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      types: pokemon.Types ? pokemon.Types.map((type) => type.name) : [], // Verificar si pokemon.Types está definido antes de llamar a map
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      speed: pokemon.speed,
      weight: pokemon.weight,
      height: pokemon.height,
    }));

    const result = await Promise.all([
      ...pokemonDetailsPromises,
      ...pokeDBData,
    ]);

    // const { name } = req.query;

    // if (name) {
    //   const filteredPoke = result.filter(
    //     (poke) => poke.name.toLowerCase() === name.toLowerCase()
    //   );

    //   return res.status(200).json(filteredPoke);
    // } else {
    //   return res.status(200).json(result);
    // }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = getPokemons;
