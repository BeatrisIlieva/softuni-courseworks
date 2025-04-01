from typing import Dict


class Player:
    GUILD = "Unaffiliated"

    def __init__(self, name, hp, mp):
        self.name = name
        self.hp = hp
        self.mp1 = mp
        self.mp = self.mp1
        self.skills: Dict[str: int] = {}
        self.guild = Player.GUILD

    def add_skill(self, skill_name, mana_cost):
        if skill_name in self.skills:
            return "Skill already added"

        self.skills[skill_name] = mana_cost

        return f"Skill {skill_name} added to the collection of the player {self.name}"

    def player_info(self):
        first_part_of_message = "\n".join(
            [f"Name: {self.name}", f"Guild: {self.guild}", f"HP: {self.hp}", f"MP: {self.mp}"])

        second_part_of_message = "\n".join([f"==={key} - {value}" for key, value in self.skills.items()])

        final_message = "\n".join([first_part_of_message, second_part_of_message])

        return final_message


