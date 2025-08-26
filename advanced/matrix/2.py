rows, cols = [int(x) for x in input().split(' ')]
matrix = [input().split(' ') for _ in range(rows)]

count = 0

for i in range(rows - 1):
    for j in range(cols - 1):
        if matrix[i][j] == matrix[i][j + 1] == matrix[i + 1][j] == matrix[i + 1][j + 1]:
            count += 1

print(count)
# 3 4
# A B B D
# E B B B
# I J B B
