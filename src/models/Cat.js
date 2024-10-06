import Animal from "./Animal";

class Cat extends Animal {
  constructor(
    id,
    url,
    name,
    temperament,
    energy_level,
    intelligence,
    life_span
  ) {
    super(id, url, name, temperament, life_span);
    this.kind = "Cat";
    this.energy_level = energy_level;
    this.intelligence = intelligence;
  }
}

export default Cat;
