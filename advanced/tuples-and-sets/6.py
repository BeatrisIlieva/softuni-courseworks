from collections import deque

operations_mapper = {
    '+': lambda x, y: x + y,
    '-': lambda x, y: x - y,
    '*': lambda x, y: x * y,
    '/': lambda x, y: x / y if y > 0 else 0
}


bees = deque([int(x) for x in input().split(' ')])
nectars = [int(x) for x in input().split(' ')]
symbols = deque(input().split(' '))

collected_honey = 0

while bees and nectars:
    bee = bees.popleft()
    nectar = nectars.pop()

    if nectar >= bee:
        operator = symbols.popleft()
        honey_to_add = operations_mapper[operator](bee, nectar)
        collected_honey += abs(honey_to_add)

    else:
        bees.appendleft(bee)

print(f'Total honey made: {collected_honey}')

if bees:
    print(f'Bees left: {", ".join([str(x) for x in bees])}')

if nectars:
    print(f'Nectar left: {", ".join([str(x) for x in nectars])}')

# 20 62 99 35 0 150
# 120 60 10 1 70 10
# + - + + / * - - /
