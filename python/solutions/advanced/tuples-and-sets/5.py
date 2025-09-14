from collections import deque

chocolates = [int(x) for x in input().split(', ')]
milks = deque([int(x) for x in input().split(', ')])

shakes_made = 0


while chocolates and milks and shakes_made < 5:
    chocolate = chocolates[-1]
    milk = milks[0]

    if chocolate <= 0 and milk <= 0:
        chocolates.pop()
        milks.popleft()
        continue

    if chocolate <= 0:
        chocolates.pop()
        continue

    if milk <= 0:
        milks.popleft()
        continue

    if chocolate != milk:
        milks.rotate(-1)
        chocolates[-1] = chocolate - 5
        continue

    chocolates.pop()
    milks.popleft()
    shakes_made += 1

if shakes_made == 5:
    print('Great! You made all the chocolate milkshakes needed!')
else:
    print('Not enough milkshakes.')

if chocolates:
    print(f'Chocolate: {", ".join(str(x) for x in chocolates)}')
else:
    print('Chocolate: empty')

if milks:
    print(f'Milk: {", ".join(str(x) for x in milks)}')
else:
    print('Milk: empty')
