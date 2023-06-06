export const searchValidate = (name) => {
  let errors = {};

  const nameRegex = /^[a-zA-Z\s-]+$/;
  //Validador de string
  if (name) {
    if (!nameRegex.test(name)) {
      errors.name =
        "Name can only contains letters, spaces and hyphen... Try it again!";
    }
    //Validador de numeros
    if (/\d/.test(name)) {
      errors.name = "Name cannot contain numbers... Try it again!";
    }
  } else {
    // Si el nombre de búsqueda esté vacío, tira este error
    errors.name = "You are not looking for anything... Try it again!";
  }
  return errors;
};
