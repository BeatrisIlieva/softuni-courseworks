def generating_0_or_1_vectors(vector, idx):
    if idx >= len(vector):
        print("".join([str(x) for x in vector]))
        return

    for num in range(2):
        vector[idx] = num
        generating_0_or_1_vectors(vector, idx + 1)


n = int(input())
vector = [None] * n
index = 0

generating_0_or_1_vectors(vector, index)
