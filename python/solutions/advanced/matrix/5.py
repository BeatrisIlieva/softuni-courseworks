def validate_coordinates(row1, col1, row2, col2, rows, cols):
    def validate_coordinate(cor, length):
        return 0 <= cor < length

    row1_is_valid = validate_coordinate(row1, rows)
    col1_is_valid = validate_coordinate(col1, cols)
    row2_is_valid = validate_coordinate(row2, rows)
    col2_is_valid = validate_coordinate(col2, cols)

    return row1_is_valid and col1_is_valid and row2_is_valid and col2_is_valid


rows, cols = [int(x) for x in input().split()]

matrix = [input().split() for _ in range(rows)]


while True:
    command = input()

    if command == 'END':
        break

    elements = command.split(' ')

    if len(elements) != 5 or elements[0] != 'swap':
        print('Invalid input!')
        continue

    row1 = int(elements[1])
    col1 = int(elements[2])
    row2 = int(elements[3])
    col2 = int(elements[4])

    if not validate_coordinates(row1, col1, row2, col2, rows, cols):
        print('Invalid input!')
        continue

    matrix[row1][col1], matrix[row2][col2] = matrix[row2][col2], matrix[row1][col1]

    [print(' '.join(row)) for row in matrix]


# 2 3
# 1 2 3
# 4 5 6
# swap 0 0 1 1
# swap 10 9 8 7
# swap 0 1 1 0
# END
