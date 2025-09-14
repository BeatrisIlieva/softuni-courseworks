directions = {
    'U': lambda r, c: (r - 1, c),
    'UL': lambda r, c: (r - 1, c - 1),
    'UR': lambda r, c: (r - 1, c + 1),
    'R': lambda r, c: (r, c + 1),
    'D': lambda r, c: (r + 1, c),
    'DL': lambda r, c: (r + 1, c - 1),
    'DR': lambda r, c: (r + 1, c + 1),
    'L': lambda r, c: (r, c - 1),
}


def coordinate_is_valid(coordinate, length):
    return 0 <= coordinate < length


n = int(input())

matrix = [[int(x) for x in input().split()] for _ in range(n)]

bombs_input = input().split(' ')

for bomb in bombs_input:
    row, col = [int(x) for x in bomb.split(',')]
    cell_value = matrix[row][col]

    if cell_value > 0:
        matrix[row][col] = 0

        for direction in directions.values():
            current_row, current_col = direction(row, col)

            if coordinate_is_valid(current_row, n) and coordinate_is_valid(current_col, n) and matrix[current_row][current_col] > 0:
                matrix[current_row][current_col] -= cell_value

alive_cells_count = 0
alive_cells_sum = 0
for i in range(n):
    for j in range(n):
        if matrix[i][j] > 0:
            alive_cells_count += 1
            alive_cells_sum += matrix[i][j]

print(f'Alive cells: {alive_cells_count}')
print(f'Sum: {alive_cells_sum}')

[print(' '.join([str(x) for x in row])) for row in matrix]
