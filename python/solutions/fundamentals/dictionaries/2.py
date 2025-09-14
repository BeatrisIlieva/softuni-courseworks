courses = {}

command = input()

while command != 'end':

    course, student = command.split(' : ')

    if course not in courses.keys():
        courses[course] = []

    courses[course].append(student)

    command = input()

for key, value in courses.items():
    students_count = len(value)

    print(f'{key}: {students_count}')

    for student in value:
        print(f'-- {student}')

# Programming Fundamentals : John Smith
# Programming Fundamentals : Linda Johnson
# JS Core : Will Wilson
# Java Advanced : Harrison White
# end
