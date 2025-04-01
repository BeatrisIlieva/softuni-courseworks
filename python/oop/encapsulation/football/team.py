from typing import List, Union

from encapsulation.football.player import Player


class Team:
    def __init__(self, name: str, rating: int) -> None:
        self.__name = name
        self.__rating = rating
        self.__players: List[Player] = []

    def add_player(self, player: Player) -> str:
        if player in self.__players:
            return f"Player {player.name} has already joined"

        self.__players.append(player)

        return f"Player {player.name} joined team {self.__name}"

    def remove_player(self, player_name: str) -> Union[Player, str]:
        player = None

        for p in self.__players:
            if p.name == player_name:
                player = p
                self.__players.remove(p)
                break
                
        if player:
            return player

        return f"Player {player_name} not found"
