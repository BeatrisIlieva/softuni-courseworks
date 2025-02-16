function solve(grade) {
    if (grade >= 5.5) {
        return `Excellent (${grade.toFixed(2)})`;
    }
    if (grade >= 4.5) {
        return `Very good (${grade.toFixed(2)})`;
    }
    if (grade >= 3.5) {
        return `Good (${grade.toFixed(2)})`;
    }
    if (grade >= 3) {
        return `Poor (${grade.toFixed(2)})`;
    } else {
        return 'Fail (2)';
    }
}

console.log(solve(4.50));

