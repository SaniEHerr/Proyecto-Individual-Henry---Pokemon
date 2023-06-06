const axios = require("axios");
const { Pokemon, Type } = require("../db.js");
// const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");

const getPokemonName = async (req, res) => {
  const { name } = req.query;
  const searchName = name.toLowerCase();

  try {
    // Buscar en la base de datos
    const pokemonDB = await Pokemon.findOne({
      where: {
        name: {
          // [Op.iLike]: `%${searchName}%`, // Aca si lo que mando en la ruta contiene aunque sea un poco de lo que pongo en searchname, lo trae
          [Op.iLike]: searchName, // Si pongo el nombre incompleto, no lo busca. Tambien  es sensible a mayus y minus
        },
      },
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    // Verificar si el Pokémon se encuentra en la base de datos
    if (pokemonDB) {
      const types = pokemonDB.Types.map((type) => type.name);
      const pokemon = {
        id: pokemonDB.id,
        name: pokemonDB.name,
        image: pokemonDB.image,
        types: types,
        hp: pokemonDB.hp,
        attack: pokemonDB.attack,
        defense: pokemonDB.defense,
        speed: pokemonDB.speed,
        weight: pokemonDB.weight,
        height: pokemonDB.height,
      };

      return res.status(200).json(pokemon);
    } else {
      // Buscar en la API si el Pokémon no está en la base de datos
      const pokeApi = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchName}`
      );

      const pokeApiData = pokeApi.data;

      if (pokeApiData) {
        const pokemon = {
          id: pokeApiData.id,
          name: pokeApiData.forms[0].name,
          image: pokeApiData.sprites.other.home.front_default,
          types: pokeApiData.types.map((elem) => elem.type.name),
          hp: pokeApiData.stats[0].base_stat,
          attack: pokeApiData.stats[1].base_stat,
          defense: pokeApiData.stats[2].base_stat,
          speed: pokeApiData.stats[5].base_stat,
          weight: pokeApiData.weight,
          height: pokeApiData.height,
        };

        return res.status(200).json(pokemon);
      } else {
        // throw new Error("Pokemon not found");
        res.status(404).json({ message: "Pokemon not found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ----------------
// ----------------

// const getPokemonName = async (req, res) => {
//   const { name } = req.query;
//   const searchName = name.toLowerCase();

//   try {
//     let pokemonData = {};

//     // Buscar en la API
//     const apiResponse = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon/${searchName}`
//     );
//     const pokemonApi = apiResponse.data;

//     if (pokemonApi) {
//       pokemonData = {
//         id: pokemonApi.id,
//         name: pokemonApi.forms[0].name,
//         image: pokemonApi.sprites.other.home.front_default,
//         types: pokemonApi.types.map((elem) => elem.type.name),
//         hp: pokemonApi.stats[0].base_stat,
//         attack: pokemonApi.stats[1].base_stat,
//         defense: pokemonApi.stats[2].base_stat,
//         speed: pokemonApi.stats[5].base_stat,
//         weight: pokemonApi.weight,
//         height: pokemonApi.height,
//       };
//     }

//     // Buscar en la base de datos
//     const pokemonDB = await Pokemon.findOne({
//       where: {
//         name: {
//           [Op.iLike]: `%${searchName}%`,
//         },
//       },
//       include: {
//         model: Type,
//         attributes: ["name"],
//         through: {
//           attributes: [],
//         },
//       },
//     });

//     if (pokemonDB) {
//       pokemonData = {
//         id: pokemonDB.id,
//         name: pokemonDB.name,
//         image: pokemonDB.image,
//         types: pokemonDB.Types.map((type) => type.name),
//         hp: pokemonDB.hp,
//         attack: pokemonDB.attack,
//         defense: pokemonDB.defense,
//         speed: pokemonDB.speed,
//         weight: pokemonDB.weight,
//         height: pokemonDB.height,
//       };
//     }

//     if (Object.keys(pokemonData).length === 0) {
//       return res.status(404).json({ message: "Pokemon not found" });
//     }

//     res.status(200).json([pokemonData]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// ------------
// ------------

// const getPokemonName = async (req, res) => {
//   const { name } = req.query;
//   const searchName = name.toLowerCase(); // Convertir a minúsculas para buscar independientemente de mayúsculas o minúsculas

//   try {
//     // Buscar en la API
//     const pokeApi = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon/${searchName}`
//     );

//     const pokeApiData = pokeApi.data;

//     // Busco en la DB usando el model Pokemon y el metodo findAll.
//     // Busco cualquier pokemon cuyo nombre contenga el valor de searchName.
//     // Los resultados se asignan a la const pokeDB.
//     // Asocio el model Type para obtener los types de pokemon relacionados.
//     const pokeDB = await Pokemon.findAll({
//       where: {
//         name: {
//           [Op.iLike]: `%${searchName}%`,
//         },
//       },
//       include: {
//         model: Type,
//         attributes: ["name"],
//         through: {
//           attributes: [],
//         },
//       },
//     });

//     // Si se encontraron datos del pokemon en la API o en la DB, se ejecuta el bloque de código.
//     if (pokeApiData || pokeDB.length > 0) {
//       // Declaro un array vacío para almacenar los datos del pokemon encontrado.
//       const pokemons = [];

//       // Obtener los datos de la API
//       if (pokeApiData) {
//         const pokemon = {
//           id: pokeApiData.id,
//           name: pokeApiData.forms[0].name,
//           image: pokeApiData.sprites.other.home.front_default,
//           types: pokeApiData.types.map((elem) => elem.type.name),
//           hp: pokeApiData.stats[0].base_stat,
//           attack: pokeApiData.stats[1].base_stat,
//           defense: pokeApiData.stats[2].base_stat,
//           speed: pokeApiData.stats[5].base_stat,
//           weight: pokeApiData.weight,
//           height: pokeApiData.height,
//         };

//         pokemons.push(pokemon);
//       }

//       // Obtener los datos de la base de datos
//       if (pokeDB.length > 0) {
//         for (const pokemonDB of pokeDB) {
//           const types = pokemonDB.Types.map((type) => type.name);
//           const pokemon = {
//             id: pokemonDB.id,
//             name: pokemonDB.name,
//             image: pokemonDB.image,
//             types: types,
//             hp: pokemonDB.hp,
//             attack: pokemonDB.attack,
//             defense: pokemonDB.defense,
//             speed: pokemonDB.speed,
//             weight: pokemonDB.weight,
//             height: pokemonDB.height,
//           };

//           pokemons.push(pokemon);
//         }
//       }

//       return res.status(200).json(pokemons);
//     } else {
//       return res.status(404).json({ message: "Pokemon not found" });
//     }
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// }-----------
// }-----------

// const getPokemonName = async (req, res) => {
//   const { name } = req.query;
//   const searchName = name.toLowerCase(); // Convertir a minúsculas para buscar independientemente de mayúsculas o minúsculas

//   try {
//     // Buscar en la API
//     const pokeApi = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon/${searchName}`
//     );

//     const pokeApiData = pokeApi.data;

//     // Buscar en la base de datos
//     const pokeDB = await Pokemon.findAll({
//       where: {
//         name: {
//           [Op.iLike]: `%${name}%`,
//         },
//       },
//       include: {
//         model: Type,
//         attributes: ["name"],
//         through: {
//           attributes: [],
//         },
//       },
//     });

//     const juntitos = [...pokeApiData, ...pokeDB];

//     // if (pokeApiData || pokeDB.length > 0) {
//     //   const pokemons = [];

//     //   // Obtener los datos de la API
//     //   if (pokeApiData) {
//     //     const pokemon = {
//     //       id: pokeApiData.id,
//     //       name: pokeApiData.forms[0].name,
//     //       image: pokeApiData.sprites.other.home.front_default,
//     //       types: pokeApiData.types.map((elem) => elem.type.name),
//     //       hp: pokeApiData.stats[0].base_stat,
//     //       attack: pokeApiData.stats[1].base_stat,
//     //       defense: pokeApiData.stats[2].base_stat,
//     //       speed: pokeApiData.stats[5].base_stat,
//     //       weight: pokeApiData.weight,
//     //       height: pokeApiData.height,
//     //     };

//     //     pokemons.push(pokemon);
//     //   }

//     //   // Obtener los datos de la base de datos
//     //   if (pokeDB.length > 0) {
//     //     for (const pokemonDB of pokeDB) {
//     //       const types = pokemonDB.Types.map((type) => type.name);
//     //       const pokemon = {
//     //         id: pokemonDB.id,
//     //         name: pokemonDB.name,
//     //         image: pokemonDB.image,
//     //         types: types,
//     //         hp: pokemonDB.hp,
//     //         attack: pokemonDB.attack,
//     //         defense: pokemonDB.defense,
//     //         speed: pokemonDB.speed,
//     //         weight: pokemonDB.weight,
//     //         height: pokemonDB.height,
//     //       };

//     //       pokemons.push(pokemon);
//     //     }
//     //   }

//     //   res.status(200).json(pokemons);
//     // } else {
//     //   res.status(404).json({ message: "Pokemon not found" });
//     // }
//     res.status(200).json(juntitos);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = getPokemonName;
