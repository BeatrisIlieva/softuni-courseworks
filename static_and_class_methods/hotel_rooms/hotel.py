from hotel_rooms.room import Room


class Hotel:
    def __init__(self, name: str) -> None:
        self.name = name
        self.rooms = []

    @property
    def guests(self):
        return sum([r.guests for r in self.rooms])

    @classmethod
    def from_stars(cls, stars_count):
        return cls(f"{stars_count} stars Hotel")

    def add_room(self, room: Room):
        self.rooms.append(room)

    def take_room(self, room_number, people):
        try:
            room = [r for r in self.rooms if r.number == room_number][0]
        except IndexError:
            return "No such room"

        return room.take_room(people)

    def free_room(self, room_number):
        try:
            room = [r for r in self.rooms if r.number == room_number][0]
        except IndexError:
            return "No such room"

        return room.free_room()

    def status(self):
        free_rooms = [r for r in self.rooms if not r.is_taken]
        taken_rooms = [r for r in self.rooms if r.is_taken]

        return f"Hotel {self.name} has {self.guests} total guests\n" + \
            f"Free rooms: {', '.join([str(x.number) for x in free_rooms])}\n" + \
            f"Taken rooms: {', '.join([str(x.number) for x in taken_rooms])}"
