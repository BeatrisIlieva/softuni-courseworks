deck_of_cards = input().split(' ')
shuffles_count = int(input())

for _ in range(shuffles_count):
    middle = len(deck_of_cards) // 2
    first_half = deck_of_cards[:middle]
    second_half = deck_of_cards[middle:]

    shuffled_deck = []
    for i in range(middle):
        shuffled_deck.append(first_half[i])
        shuffled_deck.append(second_half[i])

    deck_of_cards = shuffled_deck

print(deck_of_cards)

# one two three four
# 3

# a b c d e f g h
# 5
