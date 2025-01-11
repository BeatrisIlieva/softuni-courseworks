function solve(input) {
    // {id: {name: name, placesLeft: placesLeft}}
    const courses = {};
    // [{credits, username, email, courseId}, ...]
    const students = [];

    let currentCourseId = 1;

    const addCourseCommand = ': ';
    const addStudentCommand = ' with email ';

    function checkIfRowContainsCommand(row, command) {
        return row.includes(command);
    }

    function checkIfCourseExists(courseName) {
        const course = Object.entries(courses).find(([_, details]) => details.name === courseName);

        return course;
    }

    function updateCourse(courseId, availablePlaces) {
        courses[courseId].placesLeft += availablePlaces;
    }

    function createCourse(courseName, availablePlaces) {
        courses[currentCourseId] = { name: courseName, placesLeft: availablePlaces };
        currentCourseId += 1;
    }

    input.forEach((row) => {
        if (checkIfRowContainsCommand(row, addCourseCommand)) {
            const [courseName, availablePlaces] = row.split(addCourseCommand);

            const course = checkIfCourseExists(courseName);

            if (course) {
                const courseId = Number(course[0]);
                updateCourse(courseId, Number(availablePlaces));
            } else {
                createCourse(courseName, Number(availablePlaces));
            }
        }
    });

    console.log(courses);
}

solve([
    'JavaBasics: 15',
    'user1[26] with email user1@user.com joins JavaBasics',
    'user2[36] with email user11@user.com joins JavaBasics',
    'JavaBasics: 5',
    'C#Advanced: 5',
    'user1[26] with email user1@user.com joins C#Advanced',
    'user2[36] with email user11@user.com joins C#Advanced',
    'user3[6] with email user3@user.com joins C#Advanced',
    'C#Advanced: 1',
    'JSCore: 8',
    'user23[62] with email user23@user.com joins JSCore',
]);
