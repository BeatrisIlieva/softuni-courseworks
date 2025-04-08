import Breed from "../models/Breed";

const createCat = (options) => {
  return new Breed(
    options.id,
    options.url,
    options.breeds[0].name,
    options.breeds[0].temperament,
    options.breeds[0].energy_level,
    options.breeds[0].intelligence,
    options.breeds[0].adaptability,
    options.breeds[0].affection_level,
    options.breeds[0].child_friendly,
    options.breeds[0].dog_friendly,
    options.breeds[0].grooming,
    options.breeds[0].origin,
    options.breeds[0].lap,
    options.breeds[0].stranger_friendly,
    options.breeds[0].life_span,
    options.breeds[0].description
  );
};

export default createCat;
