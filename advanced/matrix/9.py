directions_mapper = {
    'U': lambda r, c: (r - 1, c),
    'R': lambda r, c: (r, c + 1),
    'D': lambda r, c: (r + 1, c),
    'L': lambda r, c: (r, c - 1),
}


def coordinate_is_valid(coordinate, length):
    return 0 <= coordinate < length


rows, cols = [int(x) for x in input().split(' ')]


player_coordinates = None
bunnies_coordinates = set()
matrix = []

has_won = False
has_lost = False
last_position = None

for i in range(rows):
    matrix.append(list(input()))
    for j in range(cols):
        if matrix[i][j] == 'P':
            player_coordinates = (i, j)
            last_position = (i, j)
        elif matrix[i][j] == 'B':
            bunnies_coordinates.add((i, j))

directions = list(input())

for direction in directions:
    current_row, current_col = directions_mapper[direction](
        player_coordinates[0], player_coordinates[1]
    )
    matrix[last_position[0]][last_position[1]] = '.'

    if not coordinate_is_valid(current_row, rows) or not coordinate_is_valid(current_col, cols):
        has_won = True

    else:
        last_position = player_coordinates
        player_coordinates = (current_row, current_col)

    new_bunnies_coordinates = set()

    for coordinate in bunnies_coordinates:
        row, col = coordinate[0], coordinate[1]

        for direction in directions_mapper.values():
            new_row, new_col = direction(row, col)

            if coordinate_is_valid(new_row, rows) and coordinate_is_valid(new_col, cols):
                new_bunnies_coordinates.add((new_row, new_col))

                if matrix[new_row][new_col] == 'P' and not has_won:
                    has_lost = True

                matrix[new_row][new_col] = 'B'

    bunnies_coordinates.update(new_bunnies_coordinates)

    if not has_won and not has_lost:
        [player_coordinates[0]][player_coordinates[1]] = 'P'
    if has_lost or has_won:
        break

for row in matrix:
    print(''.join(row))

if has_lost:
    print(f'dead: {last_position[0]} {last_position[1]}')

else:
    print(f'won: {last_position[0]} {last_position[1]}')
