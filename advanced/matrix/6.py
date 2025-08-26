from collections import deque

rows, cols = [int(x) for x in input().split()]
text = deque(list(input()))

matrix = []

for i in range(rows):
    matrix.append(list('*' * cols))
    
    for j in range(cols):
        if i % 2 == 0:
            matrix[i][j] = text[0]
        else:
            matrix[i][-1 -j] = text[0]
    
        text.rotate(-1)
    print(''.join(matrix[i]))

# 5 6
# SoftUni