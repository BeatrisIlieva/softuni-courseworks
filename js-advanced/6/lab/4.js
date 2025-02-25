function solve(data, criteria) {
    const people = JSON.parse(data);
    const [key, value] = criteria.split('-');
    console.log(people);
    console.log(key, value);

    for (let i = 0; i < people.length; i++) {
        const currentPerson = people[i];

        if (key == 'all') {
            console.log(
                `${i}. ${currentPerson.first_name} ${currentPerson.last_name} - ${currentPerson.email}`
            );
        } else {
            if (currentPerson[key] === value) {
                console.log(
                    `${i}. ${currentPerson.first_name} ${currentPerson.last_name} - ${currentPerson.email}`
                );
            }
        }
    }
}

solve(
    `[{

"id": "1",

"first_name": "Ardine",

"last_name": "Bassam",

"email": "abassam0@cnn.com",

"gender": "Female"

}, {

"id": "2",

"first_name": "Kizzee",

"last_name": "Jost",

"email": "kjost1@forbes.com",

"gender": "Female"

},

{

"id": "3",

"first_name": "Evanne",

"last_name": "Maldin",

"email": "emaldin2@hostgator.com",

"gender": "Male"

}]`,

    'all'
);
