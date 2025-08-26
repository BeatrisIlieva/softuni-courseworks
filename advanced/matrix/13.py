n = int(input())

bunny_coordinates = None
max_direction = None
max_matrix = None
max_eggs = -float('inf')

matrix = []

for i in range(n):
    matrix.append(input().split(' '))

    for j in range(n):
        if matrix[i][j] == 'B':
            bunny_coordinates = (i, j)

possible_directions = {
    'up': lambda i, j: (i - 1, j),
    'right': lambda i, j: (i, j + 1),
    'down': lambda i, j: (i + 1, j),
    'left': lambda i, j: (i, j - 1),
}


def is_coordinate_valid(coordinate, size):
    return 0 <= coordinate < size


for direction, move in possible_directions.items():
    current_eggs = 0
    current_matrix = []

    current_row, current_col = move(bunny_coordinates[0], bunny_coordinates[1])

    while is_coordinate_valid(current_row, n) and is_coordinate_valid(current_col, n):
        if matrix[current_row][current_col] == 'X':
            break

        current_eggs += int(matrix[current_row][current_col])
        current_matrix.append([current_row, current_col])

        current_row, current_col = move(current_row, current_col)

    if current_eggs > max_eggs and current_matrix:
        max_eggs = current_eggs
        max_matrix = current_matrix
        max_direction = direction

print(max_direction)
[print(row) for row in max_matrix]
print(max_eggs)

# 5
# 1 3 7 9 11
# X 5 4 X 63
# 7 3 21 95 1
# B 1 73 4 9
# 9 2 33 2 0
