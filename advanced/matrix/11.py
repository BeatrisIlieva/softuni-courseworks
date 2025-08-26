n = int(input())

knights = []

matrix = []

for i in range(n):
    matrix.append(list(input()))

    for j in range(n):
        if matrix[i][j] == 'K':
            knights.append([i, j])

removed_knights = 0

possible_moves = [
    (-2, -1), (-2, 1), (-1, -2), (-1, 2), (2, -1), (2, 1), (1, -2), (1, 2)
]

while True:
    max_hits = 0
    max_knight = None

    for knight_row, knight_col in knights:
        current_hits = 0

        for possible_move in possible_moves:
            next_row, next_col = knight_row + \
                possible_move[0], knight_col + possible_move[1]

            if 0 <= next_row < n and 0 <= next_col < n:
                if matrix[next_row][next_col] == 'K':
                    current_hits += 1

        if current_hits > max_hits:
            max_hits = current_hits
            max_knight = [knight_row, knight_col]

    if max_hits == 0:
        break

    matrix[max_knight[0]][max_knight[1]] = '0'
    knights.remove(max_knight)
    removed_knights += 1

print(removed_knights)


# 5
# 0K0K0
# K000K
# 00K00
# K000K
# 0K0K0
