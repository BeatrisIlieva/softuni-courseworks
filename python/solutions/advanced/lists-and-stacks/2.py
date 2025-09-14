clothes = [int(x) for x in input().split(' ')]
capacity = int(input())

used_racks = 0

while clothes:
    curr_capacity = capacity
    rack_used = False

    while clothes and clothes[-1] <= curr_capacity:
        rack_used = True
        curr_capacity -= clothes.pop()

    if rack_used:
        used_racks += 1

print(used_racks)

# 5 4 8 6 3 8 7 7 9
# 16

# 1 7 8 2 5 4 7 8 9 6 3 2 5 4 6
# 20
