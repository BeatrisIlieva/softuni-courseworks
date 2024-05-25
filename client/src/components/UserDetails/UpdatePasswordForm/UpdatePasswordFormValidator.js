const passwordMinLength = 8;

const isValid = (value, pattern) => {
  return pattern.test(value);
};

export const validatePassword = (password) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

  if (!isValid(password, passwordPattern)) {
    return "Password must contain at least one letter and one digit.";
  } else if (password.length < passwordMinLength) {
    return `Password must be at least ${passwordMinLength} characters long.`;
  } else {
    return null;
  }
};
