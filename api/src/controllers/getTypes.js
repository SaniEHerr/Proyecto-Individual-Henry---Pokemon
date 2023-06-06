const axios = require("axios");
const { Type } = require("../db.js");

const getTypes = async (req, res) => {
  try {
    // Realizo una consulta a la DB utilizando Type.findAll() para obtener todos los types existentes.
    let existingTypes = await Type.findAll();

    // // Si types.length === 0,  significa que no se encontraron types en la DB y se procede a obtener los types de la API externa.
    // if (existingTypes.length === 0) {
    //   // Hago una solicitud GET a la API usando axios.get().
    //   const pokeApi = await axios.get("https://pokeapi.co/api/v2/type");
    //   // Extraigo la propiedad results de los datos de respuesta obtenidos de la API.
    //   // Creo un nuevo array llamado "newTypes" utilizando map() en el array results. En cada iteración, se crea un objeto con la propiedad name establecida en el nombre del type correspondiente.
    //   const newTypes = pokeApi.data.results.map((type) => {
    //     return { name: type.name };
    //   });
    //   // Utilizo Type.bulkCreate(newTypes) para crear múltiples registros de tipo en la DB de una sola vez utilizando los datos de "newTypes". Que por lo que investigue, el "bulkCreate", es mas eficiente que crear cada tipo por separado.
    //   await Type.bulkCreate(newTypes);
    //   // Realizo una nueva consulta a la DB utilizando Type.findAll() para obtener todos los types, incluyendo los recién creados con sus IDs correspondientes.
    //   existingTypes = await Type.findAll(); // Obtengo todos los types después de la creación en bloque;
    // }

    // Respondo con un estado 200 y devuelvo los tipos existentes en la respuesta.
    res.status(200).json(existingTypes);
  } catch (error) {
    // En caso de error, respondo con un estado 404 y un mensaje de error.
    res.status(404).json({ error: error.message });
  }
};

module.exports = getTypes;
