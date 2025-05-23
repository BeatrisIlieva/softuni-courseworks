def binary_search(array, target):
    left_idx = 0
    right_idx = len(array) - 1

    while left_idx <= right_idx:
        mid_idx = (left_idx + right_idx) // 2
        mid_el = array[mid_idx]

        if target == mid_el:
            return mid_idx

        if target < mid_el:
            right_idx -= 1
        else:
            left_idx += 1

    return -1


array = [int(x) for x in input().split()]
target = int(input())

print(binary_search(array, target))
