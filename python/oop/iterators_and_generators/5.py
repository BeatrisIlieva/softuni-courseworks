class dictionary_iter:
    def __init__(self, my_dict):
        self.my_dict = my_dict
        self.index = -1

    def __iter__(self):
        return self

    def __next__(self):
        obj = list(self.my_dict.items())
        self.index += 1

        if self.index < len(obj):
            return obj[self.index]

        raise StopIteration


result = dictionary_iter({"name": "Peter",
"age": 24})
for x in result:
 print(x)
