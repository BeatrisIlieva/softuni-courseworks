from collections import deque

green_light_duration = int(input())
free_window_duration = int(input())

cars_count = 0
crash_happened = False

cars = deque()

command = input()
while command != 'END' and not crash_happened:

    if command != 'green':
        cars.append(command)
    else:
        current_green_light_duration = green_light_duration
        current_free_window_duration = free_window_duration

        while cars and current_green_light_duration > 0:
            car = cars.popleft()
            cars_count += 1

            for char in car:
                if current_green_light_duration > 0:
                    current_green_light_duration -= 1
                elif current_free_window_duration > 0:
                    current_free_window_duration -= 1
                else:
                    crash_happened = True
                    print('A crash happened!')
                    print(f'{car} was hit at {char}.')
                    break

    command = input()

if not crash_happened:
    print('Everyone is safe.')
    print(f'{cars_count} total cars passed the crossroads.')

# 10
# 5
# Mercedes
# green
# Mercedes
# BMW
# Skoda
# green
# END

# 9
# 3
# Mercedes
# Hummer
# green
# Hummer
# Mercedes
# green
# END
