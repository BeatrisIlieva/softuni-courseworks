from collections import deque

pumps_count = int(input())
pumps_objects = deque()

for _ in range(pumps_count):
    fuel, distance = input().split(' ')
    pumps_objects.append({'fuel': int(fuel), 'distance': int(distance)})

start_position = 0
stops = 0


while stops < pumps_count:
    current_fuel = 0

    for i in range(pumps_count):
        fuel = pumps_objects[i]['fuel']
        distance = pumps_objects[i]['distance']

        current_fuel += fuel

        if current_fuel < distance:
            pumps_objects.rotate(-1)
            stops = 0
            current_fuel = 0
            start_position += 1
            break

        current_fuel -= distance
        stops += 1

print(start_position)
