n = int(input())

for count in range(1, n + 1):
    print(" " * (n - count), end="")
    print(" ".join(["*"] * count))

for count in range(n - 1, 0, -1):
    print(" " * (n - count), end="")
    print(" ".join(["*"] * count))
