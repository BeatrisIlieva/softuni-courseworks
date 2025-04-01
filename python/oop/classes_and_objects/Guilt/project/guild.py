from typing import List
from project.player import Player

class Guild:
    def __init__(self, name: str):
        self.name = name
        self.players: List[Player] = []


    def assign_player(self, player: Player) -> str:
        if player.guild == self.name:
            return f"Player {player.name} is already in the guild."

        if player.guild != Player.GUILD:
            return f"Player {player.name} is in another guild."

        self.players.append(player)
        player.guild = self.name

        return f"Welcome player {player.name} to the guild {self.name}"

    def kick_player(self, player_name: str) -> str:
        for p in self.players:
            if p.name == player_name:
                p.guild = Player.GUILD
                return f"Player {player_name} has been removed from the guild."

        return f"Player {player_name} is not in the guild."

    def guild_info(self):
        first_message_part = f"Guild: {self.name}"
        second_message_part = "\n".join([f"{p.player_info()}" for p in self.players])

        return "\n".join({first_message_part, second_message_part})


player = Player("George", 50, 100)
print(player.add_skill("Shield Break", 20))
print(player.player_info())
guild = Guild("UGT")
print(guild.assign_player(player))
print(guild.guild_info())

