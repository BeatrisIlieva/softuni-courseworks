directions_mapper = {
    'up': lambda r, c: (r - 1, c),
    'right': lambda r, c: (r, c + 1),
    'down': lambda r, c: (r + 1, c),
    'left': lambda r, c: (r, c - 1),
}


def coordinate_is_valid(coordinate, length):
    return 0 <= coordinate < length


n = int(input())
directions = input().split(' ')

collected_coal = 0
total_coals = 0
miner_position = None

matrix = []

for i in range(n):
    matrix.append(input().split(' '))
    for j in range(n):
        if matrix[i][j] == 'c':
            total_coals += 1
        elif matrix[i][j] == 's':
            miner_position = (i, j)


for direction in directions:
    current_row, current_col = directions_mapper[direction](
        miner_position[0], miner_position[1])

    if not coordinate_is_valid(current_row, n) or not coordinate_is_valid(current_col, n):
        continue

    miner_position = (current_row, current_col)

    if matrix[current_row][current_col] == 'c':
        total_coals -= 1
        matrix[current_row][current_col] = '*'

        if total_coals == 0:
            print(f'You collected all coal! ({current_row}, {current_col})')
            break

    if matrix[current_row][current_col] == 'e':
        print(f'Game over! ({current_row}, {current_col})')

        break

else:
    print(
        f'{total_coals} pieces of coal left. ({miner_position[0]}, {miner_position[1]})')

# 5
# up right right up right
# * * * c *
# * * * e *
# * * c * *
# s * * c *
# * * c * *
