function solve(input) {
    const result = input.reduce((acc, curr) => {
        [studentInfo, gradeInfo, averageInfo] = curr.split(', ');

        const grade = Number(gradeInfo.split(': ')[1]) + 1;
        const average = Number(averageInfo.split(': ')[1]);

        if (average >= 3) {
            if (!acc[grade]) {
                acc[grade] = {};
            }

            const student = studentInfo.split(': ')[1];

            acc[grade][student] = average;
        }

        return acc;
    }, {});

    for (let grade in result) {
        console.log(`${grade} Grade`);

        const students = Object.keys(result[grade]).join(', ');

        console.log(`List of students: ${students}`);

        const totalScore = Object.values(result[grade]).reduce((acc, curr) => {
            acc += curr;
            return acc;
        }, 0);

        const averageFromLastYear = (totalScore / Object.values(result[grade]).length).toFixed(2);

        console.log(`Average annual score from last year: ${averageFromLastYear}`);

        console.log();
    }
}

solve([
    'Student name: George, Grade: 5, Graduated with an average score: 2.75',

    'Student name: Alex, Grade: 9, Graduated with an average score: 3.66',

    'Student name: Peter, Grade: 8, Graduated with an average score: 2.83',

    'Student name: Boby, Grade: 5, Graduated with an average score: 4.20',

    'Student name: John, Grade: 9, Graduated with an average score: 2.90',
    'Student name: John2, Grade: 9, Graduated with an average score: 3.90',

    'Student name: Steven, Grade: 2, Graduated with an average score: 4.90',

    'Student name: Darsy, Grade: 1, Graduated with an average score: 5.15',
]);
