import Cat from "../models/Cat";
import Dog from "../models/Dog";

const createAnimal = (type, options) => {
  switch (type.toLowerCase()) {
    case "cat":
      return new Cat(
        options.url,
        options.breeds[0].adaptability,
        options.breeds[0].affection_level,
        options.breeds[0].child_friendly,
        options.breeds[0].description,
        options.breeds[0].energy_level,
        options.breeds[0].grooming,
        options.breeds[0].hairless,
        options.id,
        options.breeds[0].intelligence,
        options.breeds[0].life_span,
        options.breeds[0].name,
        options.breeds[0].social_needs,
        options.breeds[0].stranger_friendly,
        options.breeds[0].temperament
      );
    case "dog":
      return new Dog(
        options.breeds[0].bred_for,
        options.breeds[0].breed_group,
        options.breeds[0].life_span,
        options.breeds[0].temperament,
        options.id,
        options.breeds[0].url,
        options.breeds[0].name
      );
    default:
      throw new Error("Unknown animal type");
  }
};

export default createAnimal;
