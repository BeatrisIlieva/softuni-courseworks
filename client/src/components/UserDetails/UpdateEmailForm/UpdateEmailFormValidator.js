const isValid = (value, pattern) => {
  return pattern.test(value);
};

export const validateEmail = (email) => {
    console.log(email)
  const emailPattern = /^[A-za-z0-9]+@+[a-z]+\.[a-z]+$/;

  if (!isValid(email, emailPattern)) {
    return "Invalid email format.";
  } else {
    return null;
  }
};
