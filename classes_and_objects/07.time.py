class Time:
    MAX_HOURS = 23
    MAX_MINUTES = 59
    MAX_SECONDS = 59

    def __init__(self, hours: int, minutes: int, seconds: int):
        self.hours = hours
        self.minutes = minutes
        self.seconds = seconds

    def set_time(self, hours: int, minutes: int, seconds: int) -> None:
        self.hours += hours
        self.minutes += minutes
        self.seconds += seconds

    def get_time(self):
        return f"{self.hours:02d}:{self.minutes:02d}:{self.seconds:02d}"

    def next_second(self):
        self.seconds += 1

        self.update_time()

        return self.get_time()

    def update_time(self):
        if self.seconds >= Time.MAX_SECONDS:
            self.seconds = 0
            self.minutes += 1

            if self.minutes >= Time.MAX_MINUTES:
                self.minutes = 0
                self.hours += 1

                if self.hours >= Time.MAX_HOURS:
                    self.hours = 0


time = Time(9, 30, 59)
print(time.next_second())
