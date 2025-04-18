def find_all_paths_in_a_labyrinth(row, col, lab, direction, path):
    if row < 0 or col < 0 or row >= len(lab) or col >= len(lab[0]):
        return

    if lab[row][col] == "*":
        return

    if lab[row][col] == "v":
        return

    path.append(direction)

    if lab[row][col] == "e":
        print("".join(path))
    else:
        lab[row][col] = "v"

        find_all_paths_in_a_labyrinth(row - 1, col, lab, "U", path)
        find_all_paths_in_a_labyrinth(row + 1, col, lab, "D", path)
        find_all_paths_in_a_labyrinth(row, col - 1, lab, "L", path)
        find_all_paths_in_a_labyrinth(row, col + 1, lab, "R", path)

        lab[row][col] = "-"

    path.pop()


rows = int(input())
cols = int(input())
lab = [list(input()) for _ in range(rows)]

find_all_paths_in_a_labyrinth(0, 0, lab, "", [])

# 3
# 3
# ---
# -*-
# --e