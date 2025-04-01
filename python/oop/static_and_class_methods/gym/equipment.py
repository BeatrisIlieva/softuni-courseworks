class Equipment:
    ID = 1

    def __init__(self, name: str):
        self.name = name
        self.id = Equipment.ID
        self.__increment_id()

    @classmethod
    def __increment_id(cls) -> None:
        Equipment.ID += 1

    @staticmethod
    def get_next_id() -> int:
        return Equipment.ID

    def __repr__(self) -> str:
        return f"Equipment <{self.id}> {self.name}"
