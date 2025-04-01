class Trainer:
    ID = 1

    def __init__(self, name: str) -> None:
        self.name = name
        self.id = Trainer.ID
        self.__increment_id()

    @classmethod
    def __increment_id(cls) -> None:
        Trainer.ID += 1

    @staticmethod
    def get_next_id() -> int:
        return Trainer.ID

    def __repr__(self) -> str:
        return f"Trainer <{self.id}> {self.name}"
