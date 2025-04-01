class take_skip:
    def __init__(self, step, count):
        self.step = step
        self.count = count
        self.iteration = -1

    def __iter__(self):
        return self

    def __next__(self):
        for num in range(self.count):
            self.iteration += 1
            if self.iteration == self.count:
                raise StopIteration
            return self.iteration * self.step



numbers = take_skip(10, 5)
for number in numbers:
 print(number)