def iterative_fibonacci(number):
    fib0 = 1
    fib1 = 1
    result = 0

    for _ in range(number - 1):
        result = fib0 + fib1
        fib0, fib1 = fib1, result

    return result


n = int(input())
print(iterative_fibonacci(n))
