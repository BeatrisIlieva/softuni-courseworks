force_sides = {}

command = input()

while command != 'Lumpawaroo':
    if '|' in command:
        force_side, force_user = command.split(' | ')

        force_user_exists = False
        for values in force_sides.values():
            if force_user in values:
                force_user_exists = True
                break

        if not force_user_exists:
            if force_side not in force_sides.keys():
                force_sides[force_side] = []

            force_sides[force_side].append(force_user)

    elif '->' in command:
        force_user, force_side = command.split(' -> ')

        for values in force_sides.values():
            if force_user in values:
                values.remove(force_user)
                break

        if force_side not in force_sides.keys():
            force_sides[force_side] = []

        force_sides[force_side].append(force_user)

        print(f'{force_user} joins the {force_side} side!')

    command = input()

for key, values in force_sides.items():
    if values:
        print(f'Side: {key}, Members: {len(values)}')

        for force_user in values:
            print(f'! {force_user}')


# Lighter | Royal
# Darker | DCay
# Ivan Ivanov -> Lighter
# DCay -> Lighter
# Lumpawaroo
