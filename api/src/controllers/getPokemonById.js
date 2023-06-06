const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

const getPokemonById = async (req, res) => {
  const { id } = req.params;

  // if (parseInt(id) > 151) {
  //   res.status(404).json({
  //     message: "Pokemon not found, el ID tiene que ser entre 1 y 151",
  //   });
  //   return;
  // }

  try {
    if (id.length < 8) {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((data) => data.data)
        .then((data) => {
          res.json({
            id: data.id,
            name: data.forms[0].name,
            image: data.sprites.other.home.front_default,
            // types: data.types.map((elem) => {
            //   return { name: elem.type.name };
            // }), // Asi me da un array de objetos, o sea [{ "name": "tipo" }, { "name": "tipo" }]
            types: data.types.map((elem) => elem.type.name), // Asi me da un array de nombres de types directamente
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            weight: data.weight,
            height: data.height,
          });
        })
        .catch((error) => res.json(error.message));
    } else {
      try {
        const onePokemon = await Pokemon.findOne({
          where: { id },
          include: {
            model: Type,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        });

        const types = onePokemon.Types.map((type) => type.name);
        const pokemon = {
          id: onePokemon.id,
          name: onePokemon.name,
          image: onePokemon.image,
          types: types,
          hp: onePokemon.hp,
          attack: onePokemon.attack,
          defense: onePokemon.defense,
          speed: onePokemon.speed,
          weight: onePokemon.weight,
          height: onePokemon.height,
        };

        res.json(pokemon);
      } catch (error) {
        res.json(error.message);
      }
    }
  } catch (error) {
    res.status(404).json({ message: "Pokemon not found" });
  }
};

module.exports = getPokemonById;

// let id = req.params.id;
// if (id.length < 8) {
//   await axios
//     .get(`"https://pokeapi.co/api/v2/pokemon/${id}`)
//     .then((data) => data.data)
//     .then((data) => {
//       res.send({
//         id: data.id,
//         name: data.forms[0].name,
//         image: data.sprites.other.home.front_default,
//         types: data.types.map((elem) => {
//           return { name: elem.type.name };
//         }),
//         hp: data.stats[0].base_stat,
//         attack: data.stats[1].base_stat,
//         defense: data.stats[2].base_stat,
//         speed: data.stats[5].base_stat,
//         weight: data.weight,
//         height: data.height,
//       });
//     })
//     .catch((error) => res.send(error.message));
// } else {
//   try {
//     let onePokemon = await Pokemon.findOne({
//       where: { id },
//       include: {
//         model: Type,
//         attributes: ["name"],
//         through: {
//           attributes: [],
//         },
//       },
//     });
//     res.send(onePokemon);
//   } catch (error) {
//     res.send(error.message);
//   }
// }

// -----------------------------------------

// //Destructuring data by params
// const { id } = req.params;
// //Errors handler
// try {
//   const resultid = {};
//   //Verification to determinate if the ID comes as an UUID
//   if (!id.includes("-")) {
//     //When it doesn't come as an UUID
//     //Query to API
//     const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
//     Object.assign(resultid, {
//       id: pokeApi.data.id,
//       origin: "API",
//       name: firstToUppercase(pokeApi.data.name),
//       hp: pokeApi.data.stats[0].base_stat,
//       attack: pokeApi.data.stats[1].base_stat,
//       defense: pokeApi.data.stats[2].base_stat,
//       speed: pokeApi.data.stats[5].base_stat,
//       height: pokeApi.data.height,
//       weight: pokeApi.data.weight,
//       ptypes: pokeApi.data.types,
//       img_front: pokeApi.data.sprites.front_default,
//       img_back: pokeApi.data.sprites.back_default,
//     });
//   } else {
//     //When it comes as an UUID
//     //Query to DB
//     const pokedb = await Pokemon.findOne({ where: { id: id }, include: Tipo });
//     //Structuring types
//     const tipos = pokedb.tipos.map((t) => {
//       return { id: t.dataValues.id, name: t.dataValues.name };
//     });
//     console.log(tipos);
//     console.log(pokedb.dataValues);
//     Object.assign(resultid, {
//       id: pokedb.dataValues.id,
//       origin: "DB",
//       name: firstToUppercase(pokedb.dataValues.name),
//       hp: pokedb.dataValues.hp,
//       attack: pokedb.dataValues.attack,
//       defense: pokedb.dataValues.defense,
//       speed: pokedb.dataValues.speed,
//       height: pokedb.dataValues.height,
//       weight: pokedb.dataValues.weight,
//       ptypes: tipos,
//       img_front: pokedb.dataValues.img_front,
//       img_back: pokedb.dataValues.img_back,
//     });
//   }
//   //Response to "server"
//   res.status(200).json(resultid);
// } catch (error) {
//   res.status(404).json({ error: error.message });
// }
