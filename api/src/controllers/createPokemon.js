// const { Pokemon, Type } = require("../db.js");
// const { Pokemon } = require("../db.js");
// const { Op } = require("sequelize");

// const createPokemon = async (req, res) => {
//   try {
//     const { name, image, hp, attack, defense, speed, height, weight, types } =
//       req.body;

//     const newPokemon = await Pokemon.create({
//       name: name,
//       image: image,
//       hp: hp,
//       attack: attack,
//       defense: defense,
//       speed: speed,
//       height: height,
//       weight: weight,
//     });

//     newPokemon.addTypes(types);

//     return res.status(200).json(newPokemon);
//   } catch (error) {}
// };

// const createPokemon = async (req, res) => {
//   try {
//     const { name, image, hp, attack, defense, speed, height, weight, types } =
//       req.body;
//     // Verificar si el Pokémon ya existe
//     const pokeCheck = await Pokemon.findOne({ where: { name: name } });
//     if (pokeCheck) {
//       return res.status(200).json({ message: "Pokemon already exists" });
//     }
//     // Crear el nuevo Pokémon en la base de datos
//     const newPokemon = await Pokemon.create({
//       name: name,
//       image: image,
//       hp: hp,
//       attack: attack,
//       defense: defense,
//       speed: speed,
//       height: height,
//       weight: weight,
//     });

//     // Obtener los tipos de Pokémon existentes en la base de datos
//     // const typesDB = await Type.findAll({
//     //   where: { name: types.map((t) => t.name) },
//     // });

//     // Agregar los tipos al nuevo Pokémon
//     newPokemon.addTypes(types);
//     // Obtener el nuevo Pokémon con sus tipos asociados
//     // const result = await Pokemon.findOne({
//     //   where: { name: name },
//     //   include: Type,
//     // });
//     // Responder al cliente con el nuevo Pokémon creado
//     return res.status(201).json({
//       message: "New pokemon added to the pokedex!!",
//       pokemon: newPokemon,
//     });
//     // res.status(200).send("Wa a estar creando un Pokemon");
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

const { Pokemon, Type } = require("../db.js");

const createPokemon = async (req, res) => {
  try {
    // const { name, image, hp, attack, defense, speed, height, weight, types } =
    //   req.body;
    // // Verificar si el Pokémon ya existe
    // const pokeCheck = await Pokemon.findOne({ where: { name: name } });
    // if (pokeCheck) {
    //   return res.status(200).json({ message: "Pokemon already exists" });
    // }
    // // Crear el nuevo Pokémon en la base de datos
    // const newPokemon = await Pokemon.create({
    //   name: name,
    //   image: image,
    //   hp: hp,
    //   attack: attack,
    //   defense: defense,
    //   speed: speed,
    //   height: height,
    //   weight: weight,
    // });
    // // Obtener los tipos de Pokémon existentes en la base de datos
    // const typesDB = await Type.findAll({
    //   where: { name: types.map((t) => t.name) },
    //   // include: [
    //   //   {
    //   //     model: Temperament,
    //   //     attributes: ["name"],
    //   //     through: {
    //   //       attributes: [],
    //   //     },
    //   //   },
    //   // ],
    // });
    // // Agregar los tipos al nuevo Pokémon
    // await newPokemon.addTypes(types);
    // // Obtener el nuevo Pokémon con sus tipos asociados
    // const result = await Pokemon.findOne({
    //   where: { id: newPokemon.id },
    //   include: Type,
    // });
    // // Responder al cliente con el nuevo Pokémon creado
    // return res
    //   .status(201)
    //   .json({ message: "New pokemon added to the pokedex!!", pokemon: result });

    // ---------------
    // ---------------
    // ---------------

    // const { name, image, hp, attack, defense, speed, height, weight, types } =
    //   req.body;
    // // Verificar si el Pokémon ya existe
    // const pokeCheck = await Pokemon.findOne({ where: { name: name } });
    // if (pokeCheck) {
    //   return res.status(200).json({ message: "Pokemon already exists" });
    // }
    // // Crear el nuevo Pokémon en la base de datos
    // const newPokemon = await Pokemon.create({
    //   name: name,
    //   image: image,
    //   hp: hp,
    //   attack: attack,
    //   defense: defense,
    //   speed: speed,
    //   height: height,
    //   weight: weight,
    // });
    // // Obtener los tipos de Pokémon existentes en la base de datos
    // const existingTypes = await Type.findAll({
    //   where: { name: types.map((t) => t.name) },
    // });
    // // Agregar los tipos al nuevo Pokémon
    // await newPokemon.addTypes(types);
    // // Obtener el nuevo Pokémon con sus tipos asociados
    // const result = await Pokemon.findOne({
    //   where: { id: newPokemon.id },
    //   include: Type,
    // });
    // // Obtener los nombres de los tipos asociados al nuevo Pokémon
    // const typeNames = result.Types.map((type) => type.name);
    // // Responder al cliente con el nuevo Pokémon creado y los nombres de los tipos
    // return res.status(201).json({
    //   message: "New pokemon added to the pokedex!!",
    //   pokemon: { ...result.toJSON(), types: typeNames },
    // });

    // ---------------
    // ---------------
    // ---------------

    // const { name, image, hp, attack, defense, speed, height, weight, types } =
    //   req.body;
    // // Verificar si el Pokémon ya existe
    // const pokeCheck = await Pokemon.findOne({ where: { name: name } });
    // if (pokeCheck) {
    //   return res.status(200).json({ message: "Pokemon already exists" });
    // }
    // // Crear el nuevo Pokémon en la base de datos
    // const newPokemon = await Pokemon.create({
    //   name: name,
    //   image: image,
    //   hp: hp,
    //   attack: attack,
    //   defense: defense,
    //   speed: speed,
    //   height: height,
    //   weight: weight,
    // });
    // // Obtener los tipos de Pokémon existentes en la base de datos
    // const existingTypes = await Type.findAll({
    //   where: { name: types.map((t) => t.name) },
    // });
    // // Agregar los tipos al nuevo Pokémon
    // await newPokemon.addTypes(types);
    // // Obtener el nuevo Pokémon con sus tipos asociados
    // const result = await Pokemon.findOne({
    //   where: { id: newPokemon.id },
    //   include: {
    //     model: Type,
    //     attributes: ["name"],
    //     through: { attributes: [] },
    //   }, // Excluir los atributos no deseados
    //   attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluir los atributos 'createdAt' y 'updatedAt' del Pokémon
    // });

    // // Obtener los nombres de los tipos asociados al nuevo Pokémon
    // const typeNames = result.Types.map((type) => type.name);
    // // Responder al cliente con el nuevo Pokémon creado y los nombres de los tipos
    // return res.status(201).json({
    //   message: "New pokemon added to the pokedex!!",
    //   pokemon: { ...result.toJSON(), types: typeNames },
    // });

    // ---------------
    // ---------------
    // ---------------

    const { name, image, hp, attack, defense, speed, height, weight, types } =
      req.body;
    console.log(types);

    // Verifico si el Pokémon ya existe
    const pokeCheck = await Pokemon.findOne({ where: { name: name } });
    if (pokeCheck) {
      return res.status(200).json({ message: "Pokemon already exists" });
    }

    // Creo el nuevo Pokémon en la base de datos
    const newPokemon = await Pokemon.create({
      name: name,
      image: image,
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      height: height,
      weight: weight,
    });

    // Obtengo los tipos de Pokémon existentes en la base de datos
    const existingTypes = await Type.findAll({
      where: { name: types.map((t) => t.name) },
    });

    // Agrego los tipos al nuevo Pokémon
    await newPokemon.addTypes(types);

    const result = await Pokemon.findOne({
      where: { id: newPokemon.id },
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      }, // Excluye los atributos no deseados
    });

    // Obtengo los nombres de los tipos asociados al nuevo Pokémon
    const typeNames = result.Types.map((type) => type.name);

    // Responde al cliente con el nuevo Pokémon creado y los nombres de los tipos
    return res.status(200).json({
      // message: "New pokemon added to the pokedex!!",
      pokemon: {
        id: newPokemon.id,
        name: newPokemon.name,
        image: newPokemon.image,
        hp: newPokemon.hp,
        attack: newPokemon.attack,
        defense: newPokemon.defense,
        speed: newPokemon.speed,
        height: newPokemon.height,
        weight: newPokemon.weight,
        types: typeNames,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

module.exports = createPokemon;
