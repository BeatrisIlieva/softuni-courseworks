class Glass:
    CAPACITY = 250

    def __init__(self):
        self.content = 0

    def fill(self, ml: int) -> str:
        if Glass.CAPACITY < ml:
            return f"Cannot add {ml} ml"

        self.content += ml

        return f"Glass filled with {ml} ml"

    def empty(self) -> str:
        self.content = 0

        return "Glass is now empty"

    def info(self) -> str:
        space_left = Glass.CAPACITY - self.content

        return f"{space_left} ml left"


glass = Glass()
print(glass.fill(100))
print(glass.fill(200))
print(glass.empty())
print(glass.fill(200))
print(glass.info())
