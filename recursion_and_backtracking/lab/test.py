def find_all_paths(rows, cols, matrix, row, col):
    if row >= rows or col >= cols or matrix[row][col] == "v":
        return 0

    if row == rows - 1 or col == cols - 1:
        return 1

    matrix[row][col] = "v"

    result = 0

    result += find_all_paths(rows, cols, matrix, row + 1, col)
    result += find_all_paths(rows, cols, matrix, row, col + 1)

    matrix[row][col] = "-"

    return result


rows = int(input())
cols = int(input())

matrix = [["-" for _ in range(cols)] for _ in range(rows)]

print(find_all_paths(rows, cols, matrix, 0, 0))
