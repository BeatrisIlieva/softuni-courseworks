# class MyList:
#     def __init__(self, numbers):
#         self.numbers = numbers
#         self.index = -1

#     def __iter__(self):
#         return self

#     def __next__(self):
#         if self.index == len(self.numbers) - 1:
#             raise StopIteration

#         self.index += 1

#         return self.numbers[self.index]


# # for el in MyList([1, 2, 3]):
# #     print(el)


# def my_generator(numbers):
#     for num in numbers:
#         yield num
    
# gen = my_generator([1, 2, 3])
# print(next(gen))
# print(next(gen))
# print(next(gen))
# # print(next(gen))



class MyList:
    def __init__(self, numbers):
        self.numbers = numbers
        self.index = -1
        
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.index == len(self.numbers) -1:
            raise StopIteration
        
        self.index += 1
        
        return self.numbers[self.index]
    
# for el in MyList([1, 2, 3]):
#     print(el)
    
    
def my_generator(numbers):
    try:
        for el in numbers:
            yield el
    except StopIteration:
        pass
        
        
my_gen = my_generator([1, 2, 3])
print(next(my_gen))
print(next(my_gen))
print(next(my_gen))
print(next(my_gen))