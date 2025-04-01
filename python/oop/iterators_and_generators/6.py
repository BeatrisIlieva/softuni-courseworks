class countdown_iterator:
    def __init__(self, num):
        self.limit = num
        self.num = num + 1

    def __iter__(self):
        return self

    def __next__(self):
        self.num -= 1

        if self.num == 0:
            raise StopIteration

        return self.num


iterator = countdown_iterator(10)
for item in iterator:
    print(item, end=" ")
