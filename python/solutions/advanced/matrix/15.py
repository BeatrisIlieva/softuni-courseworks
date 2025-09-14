possible_directions = {
    'up': lambda i, j, step: (i - 1 * step, j),
    'right': lambda i, j, step: (i, j + 1 * step),
    'down': lambda i, j, step: (i + 1 * step, j),
    'left': lambda i, j, step: (i, j - 1 * step),
}


def is_coordinate_valid(coordinate, size):
    return 0 <= coordinate < size


n = 5

shooter_coordinates = None
shoot_targets = []
targets_count = 0

matrix = []

for i in range(n):
    matrix.append(input().split(' '))

    for j in range(n):
        if matrix[i][j] == 'A':
            shooter_coordinates = (i, j)
        elif matrix[i][j] == 'x':
            targets_count += 1


commands_count = int(input())


for _ in range(commands_count):
    command_elements = input().split(' ')
    direction = command_elements[1]

    if command_elements[0] == 'shoot':
        next_row, next_col = possible_directions[direction](
            shooter_coordinates[0], shooter_coordinates[1], 1)
        while is_coordinate_valid(next_row, n) and is_coordinate_valid(next_col, n):
            if matrix[next_row][next_col] == 'x':
                targets_count -= 1
                shoot_targets.append([next_row, next_col])
                matrix[next_row][next_col] = '.'
                break
            next_row, next_col = possible_directions[direction](
                next_row, next_col, 1)

    elif command_elements[0] == 'move':
        steps = int(command_elements[2])
        next_row, next_col = possible_directions[direction](
            shooter_coordinates[0], shooter_coordinates[1], steps)

        if is_coordinate_valid(next_row, n) and is_coordinate_valid(next_col, n):
            if matrix[next_row][next_col] == '.':
                matrix[shooter_coordinates[0]][shooter_coordinates[1]] = '.'
                shooter_coordinates = (next_row, next_col)
                matrix[next_row][next_col] = 'A'

    if targets_count == 0:
        print(f'Training completed! All {len(shoot_targets)} targets hit.')
        break


else:
    print(f'Training not completed! {targets_count} targets left.')

[print(row) for row in shoot_targets]


# . . . . .
# x . . . .
# . A . . .
# . . . x .
# . x . . x
# 3
# shoot down
# move right 4
# move left 1
