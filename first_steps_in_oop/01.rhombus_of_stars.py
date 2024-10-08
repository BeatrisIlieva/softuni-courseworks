n = int(input())

for count in range(1, n + 1):
    print(" " * (n - count), end=" ")
    print(" ".join(["*"] * count))