const isValid = (value, pattern) => {
  return pattern.test(value);
};

const passwordMinLength = 8;

export const validatePassword = (password) => {
  if (!validPasswordPattern(password)) {
    return "Password must contain at least one letter and one digit.";
  } else if (!validPasswordLength(password)) {
    return `Password must be at least ${passwordMinLength} characters long.`;
  } else {
    return null;
  }
};

export const validatePasswordMismatch = (NewPassword, RetypeNewPassword) => {
  if (passwordMismatch(NewPassword, RetypeNewPassword)) {
    return "The two password fields didn't match";
  } else {
    return null;
  }
};

const validPasswordPattern = (password) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

  return isValid(password, passwordPattern);
};

const validPasswordLength = (password) => {
  

  return password.length >= passwordMinLength;
};

const passwordMismatch = (password, retypePassword) => {
  return password !== retypePassword;
};
