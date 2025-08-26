numbers = [int(num) for num in input().split(', ')]

group = 10

while numbers:
    filtered_numbers = [num for num in numbers if num <= group]
    numbers = [num for num in numbers if num not in filtered_numbers]
    
    print(f"Group of {group}'s: {filtered_numbers}")
    
    group += 10

