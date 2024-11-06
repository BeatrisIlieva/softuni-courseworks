def nested_loops_to_recursion(n, vector, idx):
    if idx >= n:
        print(" ".join([str(x) for x in vector]))
        return

    for num in range(1, n + 1):
        vector[idx] = num
        nested_loops_to_recursion(n, vector, idx + 1)


n = int(input())
vector = [None] * n
nested_loops_to_recursion(n, vector, 0)
