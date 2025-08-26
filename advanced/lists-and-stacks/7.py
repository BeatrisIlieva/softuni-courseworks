from collections import deque

bullets_price = int(input())
gun_barrel_size = int(input())

bullets_stack = [int(x) for x in input().split(' ')]
locks_queue = deque([int(x) for x in input().split(' ')])

intelligence = int(input())

shots = 0
total_price = 0

while bullets_stack and locks_queue:
    shots += 1
    total_price += bullets_price
    bullet = bullets_stack.pop()
    lock_can_be_destroyed = locks_queue[0] >= bullet

    if lock_can_be_destroyed:
        locks_queue.popleft()
        print('Bang!')
    else:
        print('Ping!')
        
    if shots == gun_barrel_size and bullets_stack:
        print('Reloading!')
        shots = 0


if locks_queue:
    print(f"Couldn't get through. Locks left: {len(locks_queue)}")
else:
    print(f'{len(bullets_stack)} bullets left. Earned ${intelligence - total_price}')


# 50
# 2
# 11 10 5 11 10 20
# 15 13 16
# 1500

# 20
# 6
# 14 13 12 11 10 5
# 13 3 11 10
# 800