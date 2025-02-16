function solve(password) {
    const validations = [
        [validatePasswordLength, 'Password must be between 6 and 10 characters'],
        [validatePasswordIsAlphaNumeric, 'Password must consist only of letters and digits'],
        [validatePasswordIsStrong, 'Password must have at least 2 digits'],
    ];

    const messages = [];

    validations.forEach(([validator, message]) => {
        if (!validator(password)) {
            messages.push(message);
        }
    });

    if (messages.length === 0) {
        console.log('Password is valid');
    } else {
        for (const message of messages) {
            console.log(message);
        }
    }

    function validatePasswordLength(password) {
        return password.length >= 6 && password.length <= 10;
    }

    function validatePasswordIsAlphaNumeric(password) {
        return /^[A-Za-z0-9]+$/.test(password);
    }

    function validatePasswordIsStrong(password) {
        return (
            Array.from(password)
                .map((char) => Number(char))
                .filter((el) => Number.isInteger(el)).length >= 2
        );
    }
}

// solve('logIn');
// solve('MyPass123');
solve('Pakk00');
