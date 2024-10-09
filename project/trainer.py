from typing import List


class Pokemon:
    def __init__(self, name: str, health: int):
        self.name = name
        self.health = health

    def pokemon_details(self) -> str:
        return f"{self.name} with health {self.health}"


class Trainer:
    def __init__(self, name: str):
        self.name = name
        self.pokemons: List[Pokemon] = []

    def add_pokemon(self, pokemon: Pokemon):
        for x in self.pokemons:
            if x.name == pokemon.name:
                return "This pokemon is already caught"

        self.pokemons.append(pokemon)

        return f"Caught {pokemon.pokemon_details()}"

    def release_pokemon(self, pokemon_name: str) -> str:
        for x in self.pokemons:
            if x.name == pokemon_name:
                self.pokemons.remove(x)
                return f"You have released {pokemon_name}"

        return "Pokemon is not caught"

    def trainer_data(self) -> str:
        trainer_text = f"Pokemon Trainer {self.name}"

        pokemon_count_text = f"Pokemon count {len(self.pokemons)}"

        pokemon_details_text = "\n".join(
            [f"- {p.pokemon_details()}" for p in self.pokemons]
        )

        message = [trainer_text, pokemon_count_text, pokemon_details_text]

        return "\n".join(message)


pokemon = Pokemon("Pikachu", 90)
print(pokemon.pokemon_details())
trainer = Trainer("Ash")
print(trainer.add_pokemon(pokemon))
second_pokemon = Pokemon("Charizard", 110)
print(trainer.add_pokemon(second_pokemon))
print(trainer.add_pokemon(second_pokemon))
print(trainer.release_pokemon("Pikachu"))
print(trainer.release_pokemon("Pikachu"))
print(trainer.trainer_data())
