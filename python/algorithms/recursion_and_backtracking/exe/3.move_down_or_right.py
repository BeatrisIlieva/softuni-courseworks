# def move_down_or_right(row, col, rows, cols):
#     if row >= rows or col >= cols:
#         return 0
#
#     if row == rows - 1 and col == cols - 1:
#         return 1
#
#     result = 0
#
#     result += move_down_or_right(row + 1, col, rows, cols)
#     result += move_down_or_right(row, col + 1, rows, cols)
#
#     return result
#
#
# row = 0
# col = 0
#
# rows = int(input())
# cols = int(input())
#
# print(move_down_or_right(row, col, rows, cols))

def find_all_paths(matrix, rows, cols, row, col):
    if row >= rows or col >= cols or matrix[row][col] == "v":
        return 0
    if row == rows - 1 and col == cols - 1:
        return 1

    matrix[row][col] = "v"

    result = 0

    result += find_all_paths(matrix, rows, cols, row + 1, col)
    result += find_all_paths(matrix, rows, cols, row, col + 1)

    matrix[row][col] = "-"

    return result


rows = int(input())
cols = int(input())

matrix = [["-" for _ in range(cols)] for _ in range(rows)]

print(find_all_paths(matrix, rows, cols, 0, 0))

