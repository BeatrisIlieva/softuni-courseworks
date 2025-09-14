number_of_rooms = int(input())

total_chairs = 0

for room_number in range(1, number_of_rooms + 1):
    chairs, visitors = input().split(' ')
    
    difference = len(chairs) - int(visitors)
    total_chairs += difference
    
    if difference < 0:
        print(f'{abs(difference)} more chairs needed in room {room_number}')
        
if total_chairs >= 0:
    print(f'Game On, {total_chairs} free chairs left')
    
    
