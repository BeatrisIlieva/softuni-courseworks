def binary_search(array, target, left_idx, right_idx):
    if left_idx > right_idx:
        return -1

    mid_idx = (left_idx + right_idx) // 2
    mid_el = array[mid_idx]

    if target == mid_el:
        return mid_idx

    if target < mid_el:
        return binary_search(array, target, left_idx, right_idx - 1)

    if target > mid_el:
        return binary_search(array, target, left_idx + 1, right_idx)


array = [int(x) for x in input().split()]
target = int(input())

left_idx = 0
right_idx = len(array) - 1

print(binary_search(array, target, left_idx, right_idx))
