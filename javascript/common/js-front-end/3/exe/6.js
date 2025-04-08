function validatePassword(password) {
    const validations = {
        validateLength: password => password.length >= 6 && password.length <= 10,
        validateAlphaNumeric: password => /^[A-Za-z0-9]+$/.test(password),
        validateTwoDigits: password => /[0-9]{2,}/.test(password)
    };

    const result = [];

    !validations.validateLength(password) &&
        result.push('Password must be between 6 and 10 characters');

    !validations.validateAlphaNumeric(password) &&
        result.push('Password must consist only of letters and digits');

    !validations.validateTwoDigits(password) && result.push('Password must have at least 2 digits');

    console.log(result.length > 0 ? result.join('\n') : 'Password is valid');
}

validatePassword('Pa22hhh');
