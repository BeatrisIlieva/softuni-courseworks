possible_directions = {
    'U': lambda i, j: (i - 1, j),
    'R': lambda i, j: (i, j + 1),
    'D': lambda i, j: (i + 1, j),
    'L': lambda i, j: (i, j - 1),
}


def is_coordinate_valid(coordinate, size):
    return 0 <= coordinate < size


rows, cols = [int(x) for x in input().split(' ')]

player_coordinates = None
last_player_coordinates = None
matrix = []

bunnies_coordinates = set()

for i in range(rows):
    matrix.append(list(input()))

    for j in range(cols):
        if matrix[i][j] == 'P':
            player_coordinates = (i, j)
            last_player_coordinates = (i, j)
        elif matrix[i][j] == 'B':
            bunnies_coordinates.add((i, j))

commands = list(input())

has_won = False
has_lost = False

for command in commands:
    next_row, next_col = possible_directions[command](
        player_coordinates[0], player_coordinates[1])

    if not is_coordinate_valid(next_row, rows) or not is_coordinate_valid(next_col, cols):
        has_won = True
        matrix[player_coordinates[0]][player_coordinates[1]] = '.'

    else:
        if matrix[next_row][next_col] == 'B':
            has_lost = True
        else:
            matrix[next_row][next_col] = 'P'
            matrix[player_coordinates[0]][player_coordinates[1]] = '.'
        
        player_coordinates = (next_row, next_col)

    new_bunnies_coordinates = set()
    for bunny in bunnies_coordinates:
        for direction in possible_directions.values():
            bunny_row, bunny_col = direction(bunny[0], bunny[1])

            if is_coordinate_valid(bunny_row, rows) and is_coordinate_valid(bunny_col, cols):
                new_bunnies_coordinates.add((bunny_row, bunny_col))

                if matrix[bunny_row][bunny_col] == 'P' and not has_won:
                    has_lost = True

                matrix[bunny_row][bunny_col] = 'B'

    bunnies_coordinates.update(new_bunnies_coordinates)

    if has_lost or has_won:
        break


[print(''.join(row)) for row in matrix]

if has_won:
    print(f'won: {" ".join([str(x) for x in player_coordinates])}')
else:
    print(f'dead: {" ".join([str(x) for x in player_coordinates])}')
