def connected_areas_in_a_matrix(row, col, matrix):
    if row < 0 or row >= len(matrix) or col < 0 or col >= len(matrix[0]):
        return 0

    if matrix[row][col] != "-":
        return 0

    matrix[row][col] = "v"

    result = 1

    result += connected_areas_in_a_matrix(row - 1, col, matrix)
    result += connected_areas_in_a_matrix(row + 1, col, matrix)
    result += connected_areas_in_a_matrix(row, col - 1, matrix)
    result += connected_areas_in_a_matrix(row, col + 1, matrix)

    return result

rows = int(input())
cols = int(input())

matrix = [list(input()) for _ in range(rows)]

for row in range(rows):
    for col in range(cols):
        size = connected_areas_in_a_matrix(row, col, matrix)
        if size == 0:
            continue
        print(size)
