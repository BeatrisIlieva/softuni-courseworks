from __future__ import annotations


class ExersicePlan:
    ID = 1

    def __init__(self, trainer_id: int, equipment_id: int, duration: int):
        self.trainer_id = trainer_id
        self.equipment_id = equipment_id
        self.duration = duration
        self.id = ExersicePlan.ID
        self.__increment_id()

    @classmethod
    def __increment_id(cls) -> None:
        ExersicePlan.ID += 1

    @classmethod
    def from_hours(cls, trainer_id: int, equipment_id: int, hours: int) -> ExersicePlan:
        minutes = hours * 60

        return cls(trainer_id, equipment_id, minutes)

    @staticmethod
    def get_next_id() -> int:
        return ExersicePlan.ID

    def __repr__(self) -> str:
        return f"Plan <{self.id}> with duration {self.duration} minutes"
