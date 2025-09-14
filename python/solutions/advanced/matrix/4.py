rows, cols = [int(x) for x in input().split(' ')]

start = 97

for i in range(rows):
    for j in range(cols):
        print(f'{chr(start + i)}{chr(start + i + j)}{chr(start + i)}', end=' ')
    print()