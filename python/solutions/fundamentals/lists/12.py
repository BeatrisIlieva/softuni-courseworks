cards = input().split(' ')

teams_mapper = {
    'A': [f'A-{num}' for num in range(1, 12)],
    'B': [f'B-{num}' for num in range(1, 12)],
}


def remove_player_from_team(team_letter, card):
    try:
        teams_mapper[team_letter].remove(card)
    except ValueError:
        pass


game_was_terminated = False

for card in cards:
    team_letter = card.split('-')[0]

    remove_player_from_team(team_letter, card)

    for team in teams_mapper.values():
        if len(team) < 7:
            game_was_terminated = True
            break

    if game_was_terminated:
        break

teams = []

for key, value in teams_mapper.items():
    teams.append(f'Team {key} - {len(value)}')


print('; '.join(teams))

if game_was_terminated:
    print('Game was terminated')
