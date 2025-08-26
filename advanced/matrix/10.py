elements = input().split('|')

for i in range(len(elements) -1, -1, -1):
    row = elements[i].split()
    
    if row:
        print(' '.join(row), end=' ')


# 1 2 3 |4 5 6 | 7 88