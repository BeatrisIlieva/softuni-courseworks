class Cat {
  constructor(
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
  ) {
    this.url = url;
    this.id = id;
    this.temperament = temperament;
    this.life_span = life_span;
    this.energy_level = energy_level;
    this.intelligence = intelligence;
    this.adaptability = adaptability;
    this.affection_level = affection_level;
    this.child_friendly = child_friendly;
    this.dog_friendly = dog_friendly;
    this.grooming = grooming;
    this.origin = origin;
    this.lap = lap;
    this.stranger_friendly = stranger_friendly;
    this.description = description;
  }
}

export default Cat;
