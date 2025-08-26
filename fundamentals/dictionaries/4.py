command = input()

exam_submissions = {}
banned_students = []

while command != 'exam finished':
    username, language, *rest = command.split('-')

    if language == 'banned':
        banned_students.append(username)
    else:
        points = int(rest[0])

    if username not in exam_submissions.keys():
        exam_submissions[username] = {}

    if language != 'banned':
        if language not in exam_submissions[username].keys():
            exam_submissions[username][language] = []

        exam_submissions[username][language].append(
            points
        )

    command = input()

print('Results:')

submissions_data = {}

for student, languages in exam_submissions.items():

    for language, submissions in languages.items():
        if not language in submissions_data.keys():
            submissions_data[language] = 0
        submissions_data[language] += len(submissions)

        if not student in banned_students:
            max_points = max(submissions)
            print(f'{student} | {max_points}')

print('Submissions:')
for key, value in submissions_data.items():
    print(f'{key} - {value}')


# Peter-Java-91
# George-C#-84
# Katy-Java-90
# Katy-C#-50
# Katy-banned
# exam finished
