from collections import deque

actions_mapper = {
    '+': lambda x, y: x + y,
    '-': lambda x, y: x - y,
    '*': lambda x, y: x * y,
    '/': lambda x, y: x // y,
}

expression = input().split(' ')

numbers = deque()

for el in expression:
    if el in actions_mapper.keys():
        while len(numbers) > 1:
            first_num = numbers.popleft()
            second_num = numbers.popleft()
            result = actions_mapper[el](first_num, second_num)
            numbers.appendleft(result)
    else:
        numbers.append(int(el))
        
print(numbers[0])
        
