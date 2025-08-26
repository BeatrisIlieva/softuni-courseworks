first_sequence = set(int(x) for x in input().split(' '))
second_sequence = set(int(x) for x in input().split(' '))

n = int(input())

for _ in range(n):
    elements = input().split(' ')
    command = ' '.join(elements[:2])
    numbers = [int(x) for x in elements[2:]]

    if command == 'Add First':
        first_sequence.update(numbers)
    elif command == 'Add Second':
        second_sequence.update(numbers)
    elif command == 'Remove First':
        first_sequence.difference_update(numbers)
    elif command == 'Remove Second':
        second_sequence.difference_update(numbers)
    elif command == 'Check Subset':
        if first_sequence.issubset(second_sequence) or second_sequence.issubset(first_sequence):
            print('True')
        else:
            print('False')

print(', '.join(str(x) for x in sorted(first_sequence)))
print(', '.join(str(x) for x in sorted(second_sequence)))


# 1 2 3 4 5
# 1 2 3
# 3
# Add First 5 6
# Remove Second 8 9 11
# Check Subset
