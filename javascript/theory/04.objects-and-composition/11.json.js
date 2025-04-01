const student = {
    name: 'John',
    age: 20,
    grades: [3, 5, 6],
    location: {
        longitude: 847464,
        latitude: 3736353,
    },
};

// convert object to single line JSON
const studentJson = JSON.stringify(student);
console.log(studentJson); 
// {"name":"John","age":20,"grades":[3,5,6],"location":{"longitude":847464,"latitude":3736353}}

// convert object to multiline JSON
const multiLineStudentJson = JSON.stringify(student, null, 2);
console.log(multiLineStudentJson);
// {
//   "name": "John",
//   "age": 20,
//   "grades": [
//     3,
//     5,
//     6
//   ],
//   "location": {
//     "longitude": 847464,
//     "latitude": 3736353
//   }
// }

console.log(typeof multiLineStudentJson); // string

const studentData = JSON.parse(multiLineStudentJson);
console.log(studentData); // {name: 'John', age: 20, grades: Array(3), location: {…}}
console.log(typeof studentData); // object
console.log(studentData.age); // 20


