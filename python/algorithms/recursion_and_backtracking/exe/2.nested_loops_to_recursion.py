def nested_loops_to_recursion(n, array, idx):
    if idx >= n:
        print(" ".join([str(x) for x in array]))
        return

    for num in range(1, n + 1):
        array[idx] = num
        nested_loops_to_recursion(n, array, idx + 1)


n = int(input())
array = [None] * n
nested_loops_to_recursion(n, array, 0)
