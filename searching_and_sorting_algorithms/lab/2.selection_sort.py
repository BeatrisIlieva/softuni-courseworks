nums = [int(x) for x in input().split()]

for idx in range(len(nums)):
    min_idx = idx
    min_number = nums[idx]

    for next_idx in range(idx + 1, len(nums)):
        current_num = nums[next_idx]

        if current_num < min_number:
            min_number = current_num
            min_idx = next_idx

    nums[idx], nums[min_idx] = nums[min_idx], nums[idx]

print(" ".join([str(x) for x in nums]))
