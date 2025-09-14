def add(schedule: list, title: str) -> list:
    if title not in schedule:
        schedule.append(title)

    return schedule


def insert(schedule: list, title: str, index: int) -> list:
    if title not in schedule:
        schedule.insert(int(index), title)

    return schedule


def remove(schedule: list, title: str) -> list:
    if title in schedule:
        schedule.remove(title)

    return schedule


def swap(schedule: list, first_title: str, second_title: str) -> list:
    try:
        first_title_index = schedule.index(first_title)
        second_title_index = schedule.index(second_title)

        first_exercise_exist = f'{first_title}-Exercise' in schedule
        second_exercise_exist = f'{second_title}-Exercise' in schedule

        schedule[first_title_index], schedule[second_title_index] = \
            schedule[second_title_index], schedule[first_title_index]

        if first_exercise_exist and second_exercise_exist:
            schedule[first_title_index + 1], schedule[second_title_index + 1] = \
                schedule[second_title_index +
                         1], schedule[first_title_index + 1]

        elif first_exercise_exist:
            schedule.insert(second_title_index + 1,
                            schedule.pop(first_title_index + 1))

        elif second_exercise_exist:
            schedule.insert(first_title_index + 1,
                            schedule.pop(second_title_index + 1))

    except ValueError:
        pass

    return schedule


def exercise(schedule: list, title: str) -> list:
    exercise_title = f'{title}-Exercise'

    try:
        lesson_index = schedule.index(title)

        if not exercise_title in schedule:
            schedule.insert(lesson_index + 1, exercise_title)

    except ValueError:
        schedule.extend([title, exercise_title])

    return schedule


schedule = input().split(', ')

actions_mapper = {
    'Add': add,
    'Insert': insert,
    'Remove': remove,
    'Swap': swap,
    'Exercise': exercise,
}

command = input().split(':')

while len(command) > 1:

    action = command.pop(0)
    actions_mapper[action](schedule, *command)

    command = input().split(':')

for index, element in enumerate(schedule):
    print(f'{index + 1}.{element}')


# Data Types, Objects, Lists
# Add:Databases
# Insert:Arrays:0
# Remove:Lists
# course start

# Arrays, Lists, Methods
# Swap:Arrays:Methods
# Exercise:Databases
# Swap:Lists:Databases
# Insert:Arrays:0
# course start
