def recursive_factorial(n):
    if n == 0:
        return 1

    return n * recursive_factorial(n - 1)

print(recursive_factorial(int(input())))