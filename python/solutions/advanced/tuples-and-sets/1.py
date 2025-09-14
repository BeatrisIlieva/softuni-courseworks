def create_set(set_range):
    start, end = [int(x) for x in set_range.split(',')]
    created_set = set([x for x in range(start, end + 1)])

    return created_set


n = int(input())

longest_intersection = set()

for _ in range(n):
    first_range, second_range = input().split('-')

    first_set = create_set(first_range)
    second_set = create_set(second_range)

    intersection = first_set.intersection(second_set)

    if len(intersection) > len(longest_intersection):
        longest_intersection = intersection

print(
    f'Longest intersection is {list(longest_intersection)} with length {len(longest_intersection)}')

# 3
# 0,3-1,2
# 2,10-3,5
# 6,15-3,10
