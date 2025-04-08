class Area:
    def __init__(self, row, col, size):
        self.row = row
        self.col = col
        self.size = size


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

areas = []

for row in range(rows):
    for col in range(cols):
        size = connected_areas_in_a_matrix(row, col, matrix)
        if size == 0:
            continue
        areas.append(Area(row, col, size))

print(f"Total areas found: {len(areas)}")

for idx, area in enumerate(sorted(areas, key=lambda x: -x.size)):
    print(f"Area #{idx + 1} at ({area.row}, {area.col}), size: {area.size}")


# 3
# 8
# --*---*-
# --*---*-
# ---*-*--
