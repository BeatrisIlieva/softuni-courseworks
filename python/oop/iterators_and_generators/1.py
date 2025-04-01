class custom_range:
    def __init__(self, start, end):
        self.start = start
        self.end = end
        self.current = self.start

    def __iter__(self):
        return self

    def __next__(self):
        try:
            temp = self.current
            self.current += 1
            return temp
        except StopIteration:
            return


my_range = custom_range(1, 10)
for num in my_range:
    print(num)
