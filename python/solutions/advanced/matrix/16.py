possible_directions = {
    'up': lambda i, j: (i - 1, j),
    'right': lambda i, j: (i, j + 1),
    'down': lambda i, j: (i + 1, j),
    'left': lambda i, j: (i, j - 1),
}


def is_coordinate_valid(coordinate, size):
    return 0 <= coordinate < size


number_of_presents = int(input())
n = int(input())

number_of_nice_kids = 0
number_of_gifted_kids = 0
santa_position = None
matrix = []

for i in range(n):
    matrix.append(input().split(' '))

    for j in range(n):
        if matrix[i][j] == 'S':
            santa_position = (i, j)
        elif matrix[i][j] == 'V':
            number_of_nice_kids += 1


while number_of_presents > 0:
    command = input()
    if command == 'Christmas morning':
        break

    next_row, next_col = possible_directions[command](
        santa_position[0], santa_position[1])

    if is_coordinate_valid(next_row, n) and is_coordinate_valid(next_col, n):
        if matrix[next_row][next_col] == 'V':
            number_of_presents -= 1
            number_of_gifted_kids += 1

        elif matrix[next_row][next_col] == 'C':
            for direction in possible_directions.values():
                new_row, new_col = direction(next_row, next_col)
                
                if is_coordinate_valid(new_row, n) and is_coordinate_valid(new_col, n) and number_of_presents > 0 and matrix[new_row][new_col] in 'VX':
                    if matrix[new_row][new_col] == 'V':
                        number_of_gifted_kids += 1

                    number_of_presents -= 1
                    matrix[new_row][new_col] = '-'

        matrix[santa_position[0]][santa_position[1]] = '-'
        matrix[next_row][next_col] = 'S'
        santa_position = (next_row, next_col)


if number_of_presents < 1 and number_of_gifted_kids < number_of_nice_kids:
    print('Santa ran out of presents!')

[print(' '.join(row)) for row in matrix]

if number_of_gifted_kids == number_of_nice_kids:
    print(f'Good job, Santa! {number_of_gifted_kids} happy nice kid/s.')
else:
    print(
        f'No presents for {number_of_nice_kids - number_of_gifted_kids} nice kid/s.')
