nums = [int(x) for x in input().split()]

counter = 0

is_sorted = False

while not is_sorted:
    is_sorted = True
    for idx in range(1, len(nums) - counter):
        if nums[idx - 1] > nums[idx]:
            is_sorted = False
            nums[idx - 1], nums[idx] = nums[idx], nums[idx - 1]

    counter += 1

print(*nums, sep=" ")
