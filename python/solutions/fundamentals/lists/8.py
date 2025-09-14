from collections import deque

words: list[str] = input().split(' ')
result = []

for word in words:
    letter_as_digit = ''
    characters = deque(word)

    while characters[0].isdigit():
        letter_as_digit += characters.popleft()

    first_letter = chr(int(letter_as_digit))
    characters[0], characters[-1] = characters[-1], characters[0]

    rest_letters = ''.join(characters)

    result.append(f'{first_letter}{rest_letters}')

print(' '.join(result))
