import Cat from "./Cat";

class Breed extends Cat {
  constructor(
    id,
    url,
    name,
    temperament,
    energy_level,
    intelligence,
    adaptability,
    affection_level,
    child_friendly,
    dog_friendly,
    grooming,
    origin,
    lap,
    stranger_friendly,
    life_span,
    description
  ) {
    super(
      id,
      url,
      temperament,
      energy_level,
      intelligence,
      adaptability,
      affection_level,
      child_friendly,
      dog_friendly,
      grooming,
      origin,
      lap,
      stranger_friendly,
      life_span,
      description
    );
    this.name = name;
  }
}

export default Breed;
