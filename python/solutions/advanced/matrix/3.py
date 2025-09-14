rows, cols = [int(x) for x in input().split(' ')]
matrix = [[int(x) for x in input().split(' ')] for _ in range(rows)]

max_sum = -float('inf')
max_row = None
max_col = None

for i in range(rows - 2):
    for j in range(cols - 2):
        current_sum = 0

        for k in range(i, i + 3):
            for l in range(j, j + 3):
                current_sum += matrix[k][l]

        if current_sum > max_sum:
            max_sum = current_sum
            max_row = i
            max_col = j

print(f'Sum = {max_sum}')


for i in range(max_row, max_row + 3):
    row = []
    for j in range(max_col, max_col + 3):
        row.append(matrix[i][j])

    print(' '.join([str(x) for x in row]))

# 4 5
# 1 5 5 2 4
# 2 1 4 14 3
# 3 7 11 2 8
# 4 8 12 16 4
