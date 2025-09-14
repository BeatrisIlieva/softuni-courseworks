def calculate_colors_by_count(elements):
    colors_by_count = {}

    for el in elements:
        color = el['color']
        if not color in colors_by_count.keys():
            colors_by_count[color] = 0

        colors_by_count[color] += 1

    return colors_by_count


command = input()

dwarfs = []

while command != 'Once upon a time':

    name, color, number = command.split(' <:> ')
    number = int(number)

    existing_dwarf = list(filter(
        lambda x: x['name'] == name and x['color'] == color, dwarfs))

    if existing_dwarf:
        existing_dwarf[0]['number'] = max(existing_dwarf[0]['number'], number)

    else:
        dwarfs.append({'name': name, 'color': color, 'number': number})

    command = input()

colors_by_count = calculate_colors_by_count(dwarfs)

sorted_dwarfs = sorted(
    dwarfs, key=lambda x: (-x['number'], -colors_by_count[x['color']]))

for dwarf in sorted_dwarfs:
    print(
        f'({dwarf["color"]}) {dwarf["name"]} <-> {dwarf["number"]}')

# Peter <:> Red <:> 2000
# Teodor <:> Blue <:> 1000
# George <:> Green <:> 1000
# Simon <:> Yellow <:> 4500
# Dopey <:> Simon <:> 1000
# Once upon a time
