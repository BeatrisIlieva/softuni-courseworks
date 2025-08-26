possible_directions = {
    'up': lambda i, j: (i - 1, j),
    'right': lambda i, j: (i, j + 1),
    'down': lambda i, j: (i + 1, j),
    'left': lambda i, j: (i, j - 1),
}


def is_coordinate_valid(coordinate, size):
    return 0 <= coordinate < size


n = int(input())

matrix = []
alice_position = None
collected_tea = 0

for i in range(n):
    matrix.append(input().split(' '))

    for j in range(n):
        if matrix[i][j] == 'A':
            matrix[i][j] = '*'
            alice_position = (i, j)

while collected_tea < 10:
    direction = input()

    next_row, next_col = possible_directions[direction](
        alice_position[0], alice_position[1])

    if not is_coordinate_valid(next_row, n) or not is_coordinate_valid(next_col, n):
        break

    if matrix[next_row][next_col] == 'R':
        matrix[next_row][next_col] = '*'
        break

    if matrix[next_row][next_col] not in '.*':
        collected_tea += int(matrix[next_row][next_col])

    matrix[next_row][next_col] = '*'
    alice_position = (next_row, next_col)

if collected_tea >= 10:
    print('She did it! She went to the party.')
else:
    print("Alice didn't make it to the tea party.")

[print(' '.join(row)) for row in matrix]
