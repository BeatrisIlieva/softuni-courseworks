from typing import Tuple

from project.song import Song


class Album:
    def __init__(self, name: str, *songs: Tuple[Song]):
        self.name = name
        self.songs = list(songs)
        self.published = False

    def add_song(self, song: Song) -> str:
        if song.single:
            return f"Cannot add {song.name}. It's a single"

        if self.published:
            return "Cannot add songs. Album is published."

        if song in self.songs:
            return "Song is already in the album."

        self.songs.append(song)

        return f"Song {song.name} has been added to the album {self.name}."

    def remove_song(self, song_name: str):
        try:
            song = next(filter(lambda s: s.name == song_name, self.songs))
        except StopIteration:
            return "Song is not in the album."

        if self.published:
            return "Cannot remove songs. Album is published."

    def publish(self):
        if self.published:
            return f"Album {self.name} is already published."

        self.published = True

        return f"Album {self.name} has been published."

    def details(self):
        first_message_part = f"Album {self.name}"
        second_message_part = "\n".join([f"== {s.get_info()}" for s in self.songs])

        return "\n".join([first_message_part, second_message_part])


