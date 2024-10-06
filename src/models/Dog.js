import Animal from "./Animal";

class Dog extends Animal {
  constructor( id, url, name, temperament, bred_for, breed_group, life_span) {
    super(id, url, name, life_span, temperament);
    this.kind = "Dog";
    this.bred_for = bred_for;
    this.breed_group = breed_group;
  }
}

export default Dog;
