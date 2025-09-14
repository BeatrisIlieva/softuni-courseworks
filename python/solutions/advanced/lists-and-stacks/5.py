from datetime import datetime, timedelta
from collections import deque

robots_input = input().split(';')

robots_data = {}
for robot in robots_input:
    robot_name, processing_time = robot.split('-')
    robots_data[robot_name] = {'processing_time': int(
        processing_time), 'available_at': None}

start_time = input()

products = deque()

command = input()
while command != 'End':
    products.append(command)

    command = input()

current_time = datetime.strptime(start_time, '%H:%M:%S')

while products:
    current_time = current_time + timedelta(seconds=1)
    current_product = products.popleft()

    for robot, robot_data in robots_data.items():
        available_at = robot_data['available_at']

        if available_at != None:
            available_at = datetime.strptime(available_at, '%H:%M:%S')

            if available_at > current_time:
                continue

        updated_available_at = current_time + \
            timedelta(seconds=robot_data['processing_time'])
        robot_data['available_at'] = datetime.strftime(
            updated_available_at, '%H:%M:%S')

        print(
            f'{robot} - {current_product} [{datetime.strftime(current_time, "%H:%M:%S")}]')
        break
    else:
        products.append(current_product)


# ROB-15;SS2-10;NX8000-3
# 8:00:00
# detail
# glass
# wood
# apple
# End
