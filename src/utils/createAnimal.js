import Cat from "../models/Cat";
import Dog from "../models/Dog";

const createAnimal = (type, options) => {
  switch (type.toLowerCase()) {
    case "cat":
      return new Cat(
        options.id,
        options.url,
        options.breeds[0].name,
        options.breeds[0].temperament,
        options.breeds[0].energy_level,
        options.breeds[0].intelligence,
        options.breeds[0].life_span,

      );
    case "dog":
      return new Dog(
        options.id,
        options.url,
        options.breeds[0].name,
        options.breeds[0].temperament,
        options.breeds[0].bred_for,
        options.breeds[0].breed_group,
        options.breeds[0].life_span,



      );
    default:
      throw new Error("Unknown animal type");
  }
};

export default createAnimal;
