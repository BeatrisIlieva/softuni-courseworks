class vowels:
    def __init__(self, text):
        self.text = text
        self.vowels = ["a", "e", "i", "o", "u", "y"]
        self.vowels_in_text = [x for x in text if x.lower() in self.vowels]
        self.start_index = -1
        self.end_index = len(self.vowels_in_text)

    def __iter__(self):
        return self

    def __next__(self):
        self.start_index += 1
        for idx in range(self.start_index, self.end_index):
            return self.vowels_in_text[idx]
        raise StopIteration()


my_string = vowels('Abcedifuty0o')
for char in my_string:
    print(char)
