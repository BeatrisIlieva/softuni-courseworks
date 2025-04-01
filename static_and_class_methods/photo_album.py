from os.path import curdir
from typing import List
import math


class PhotoAlbum:
    MAX_PHOTOS_PER_PAGE = 4

    def __init__(self, pages: int) -> None:
        self.pages = pages
        self.current_row = 0
        self.photos: List[List[str]] = self.__create_album()

    def __create_album(self):
        return [[] for _ in range(self.pages)]

    def add_photo(self, label: str) -> str:
        if len(self.photos[self.current_row]) == PhotoAlbum.MAX_PHOTOS_PER_PAGE:
            if self.current_row == self.pages:
                return "No more free slots"

            self.current_row += 1

        self.photos[self.current_row].append(label)

        return (f"{label} photo added successfully "
                f"on page {self.current_row + 1} "
                f"slot {len(self.photos[self.current_row])}")

    def display(self):
        result = "-" * 11 + "\n"

        for _ in self.photos:


            result += " ".join(["[]" for _ in self.photos]) + "\n"

            result += "-" * 11 + "\n"

        return result

album = PhotoAlbum(2)
print(album.add_photo("baby"))
print(album.add_photo("first grade"))
print(album.add_photo("eight grade"))
print(album.add_photo("party with friends"))
print(album.photos)
print(album.add_photo("prom"))
print(album.add_photo("wedding"))
print(album.display())


from __future__ import annotations