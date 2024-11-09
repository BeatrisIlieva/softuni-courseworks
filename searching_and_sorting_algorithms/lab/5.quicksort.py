def quick_sort(nums, start, end):
    if start >= end:
        return

    pivot = start
    left = start + 1
    right = end

    while left <= right:
        if nums[left] > nums[pivot] > nums[right]:
            nums[left], nums[right] = nums[right], nums[left]

        if nums[left] <= nums[pivot]:
            left += 1

        if nums[right] >= nums[pivot]:
            right -= 1

    nums[pivot], nums[right] = nums[right], nums[pivot]

    quick_sort(nums, start, right - 1)
    quick_sort(nums, right + 1, end)


nums = [int(x) for x in input().split()]

quick_sort(nums, 0, len(nums) - 1)

print(nums)

# 4 1 8 9 3 8 1 9 4
