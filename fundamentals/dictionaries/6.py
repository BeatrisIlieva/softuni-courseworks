number_of_dragons = int(input())

dragons = {}

DEFAULT_HEALTH = 250
DEFAULT_DAMAGE = 45
DEFAULT_ARMOR = 10

for _ in range(number_of_dragons):
    dragon_type, dragon_name, dragon_damage, dragon_health, dragon_armor = \
        input().split(' ')

    dragon_damage = DEFAULT_DAMAGE if dragon_damage == 'null' \
        else int(dragon_damage)
    dragon_health = DEFAULT_HEALTH if dragon_health == 'null' \
        else int(dragon_health)
    dragon_armor = DEFAULT_ARMOR if dragon_armor == 'null' \
        else int(dragon_armor)

    if dragon_type not in dragons.keys():
        dragons[dragon_type] = []

    try:
        existing_dragon = next(
            filter(
                lambda x: x['dragon_name'] == dragon_name, dragons[dragon_type]
            )
        )
    except StopIteration:
        existing_dragon = None

    if existing_dragon:
        dragons[dragon_type].remove(existing_dragon)

    dragons[dragon_type].append(
        {
            'dragon_name': dragon_name,
            'dragon_damage': dragon_damage,
            'dragon_health': dragon_health,
            'dragon_armor': dragon_armor,
        }
    )

for dragon_type, dragon_data in dragons.items():
    sorted_dragons = sorted(dragon_data, key=lambda x: x['dragon_name'])

    sum_damage = sum([x['dragon_damage'] for x in sorted_dragons])
    average_damage = f'{sum_damage / len(sorted_dragons):.2f}'
    sum_health = sum([x['dragon_health'] for x in sorted_dragons])
    average_health = f'{sum_health / len(sorted_dragons):.2f}'
    sum_armor = sum([x['dragon_armor'] for x in sorted_dragons])
    average_armor = f'{sum_armor / len(sorted_dragons):.2f}'

    print(f'{dragon_type}::({average_damage}/{average_health}/{average_armor})')

    for dragon in sorted_dragons:
        print(f'-{dragon["dragon_name"]} -> damage: {dragon["dragon_damage"]}, health: {dragon["dragon_health"]}, armor: {dragon["dragon_armor"]}')

# print(dragons)

# 5
# Red Bazgargal 100 2500 25
# Black Dargonax 200 3500 18
# Red Obsidion 220 2200 35
# Blue Kerizsa 60 2100 20
# Blue Algordox 65 1800 50
