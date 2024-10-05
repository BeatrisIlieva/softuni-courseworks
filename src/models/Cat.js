// Cat.js
import Animal from "./Animal";

class Cat extends Animal {
  constructor(
    url,
    adaptability,
    affection_level,
    child_friendly,
    description,
    energy_level,
    grooming,
    hairless,
    id,
    intelligence,
    life_span,
    name,
    social_needs,
    stranger_friendly,
    temperament
  ) {
    super(life_span, temperament, id, url, name); // Pass base class properties to Animal
    this.kind = "Cat"; // Specific property for Cat
    // Cat-specific properties
    this.adaptability = adaptability;
    this.affection_level = affection_level;
    this.child_friendly = child_friendly;
    this.description = description;
    this.energy_level = energy_level;
    this.grooming = grooming;
    this.hairless = hairless;
    this.intelligence = intelligence;
    this.social_needs = social_needs;
    this.stranger_friendly = stranger_friendly;
  }
}

export default Cat;
