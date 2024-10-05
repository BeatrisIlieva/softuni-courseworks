import Animal from "./Animal";

class Dog extends Animal {
  constructor(bred_for, breed_group, life_span, temperament, id, url, name) {
    super(life_span, temperament, id, url, name);
    this.kind = "Dog";
    this.bred_for = bred_for;
    this.breed_group = breed_group;
  }
}

export default Dog;
