export default function validate(input) {
  let error = {};
  let validateName = /^[a-zA-Z\s]+$/;
  let validateImage = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/;
  let validImageFormats = ["jpg", "png", "webp"];

  if (
    !input.name ||
    !validateName.test(input.name) ||
    input.name.length < 3 ||
    input.name.length > 15
  ) {
    error.name =
      "Name is mandatory and must be between 3 and 15 characters long, containing only letters and numbers";
  }

  if (
    input.hp === undefined ||
    input.hp < 1 ||
    input.hp > 255 ||
    isNaN(input.hp)
  ) {
    error.hp = "Hp is mandatory and must be between 1 and 255";
  }

  if (input.attack === undefined || input.attack < 1 || input.attack > 255) {
    error.attack = "Attack is mandatory and must be between 1 and 255";
  }

  if (input.defense === undefined || input.defense < 1 || input.defense > 255) {
    error.defense = "Defense is mandatory and must be between 1 and 255";
  }

  if (input.speed === undefined || input.speed < 1 || input.speed > 255) {
    error.speed = "Speed is mandatory and must be between 1 and 255";
  }

  if (input.height === undefined || input.height < 1 || input.height > 255) {
    error.height = "Height is mandatory and must be between 1 and 1000";
  }

  if (input.weight === undefined || input.weight < 1 || input.weight > 255) {
    error.weight = "Weight is mandatory and must be between 1 and 1000";
  }

  if (
    !input.image ||
    !validateImage.test(input.image) ||
    !validImageFormats.some((format) =>
      input.image.toLowerCase().endsWith(format)
    )
  ) {
    error.image =
      "Image is mandatory and must be a valid URL format (jpg, png, webp)";
  }

  return error;
}
