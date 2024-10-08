n = int(input())


def print_row(count, n):
    print(" " * (n - count), end="")
    print(" ".join(["*"] * count))


for count in range(1, n + 1):
    print_row(count, n)

for count in range(n - 1, 0, -1):
    print_row(count, n)
