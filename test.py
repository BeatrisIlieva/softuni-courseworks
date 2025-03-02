arr = [5, 4, 3, 2, 1]

result = arr.sort()
print(arr) # [1, 2, 3, 4, 5]
print(result) # None

result2 = sorted(arr, reverse=True)
print(result2) # [5, 4, 3, 2, 1]
