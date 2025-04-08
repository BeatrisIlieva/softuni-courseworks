import {
  FIRST_NAME_MIN_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  FIRST_NAME_MIN_LENGTH_ERROR_MESSAGE,
  FIRST_NAME_MAX_LENGTH_ERROR_MESSAGE,
  ONLY_LETTERS_FIRST_NAME_EXCEPTION_MESSAGE,
  LAST_NAME_MIN_LENGTH,
  LAST_NAME_MAX_LENGTH,
  LAST_NAME_MIN_LENGTH_ERROR_MESSAGE,
  LAST_NAME_MAX_LENGTH_ERROR_MESSAGE,
  ONLY_LETTERS_LAST_NAME_EXCEPTION_MESSAGE,
} from "../../../constants/updateProfileFormConstants";

const isValid = (value, pattern) => {
  return pattern.test(value);
};

export const validateFirstName = (firstName) => {
  const firstNamePattern = /^[A-za-z]+$/;
  if (!isValid(firstName, firstNamePattern)) {
    return ONLY_LETTERS_FIRST_NAME_EXCEPTION_MESSAGE;
  } else if (firstName.length < FIRST_NAME_MIN_LENGTH) {
    return FIRST_NAME_MIN_LENGTH_ERROR_MESSAGE;
  } else if (firstName.length > FIRST_NAME_MAX_LENGTH) {
    return FIRST_NAME_MAX_LENGTH_ERROR_MESSAGE;
  } else {
    return null;
  }
};

export const validateLastName = (lastName) => {
  const lastNamePattern = /^[A-za-z]+$/;
  if (!isValid(lastName, lastNamePattern)) {
    return ONLY_LETTERS_LAST_NAME_EXCEPTION_MESSAGE;
  } else if (lastName.length < LAST_NAME_MIN_LENGTH) {
    return LAST_NAME_MIN_LENGTH_ERROR_MESSAGE;
  } else if (lastName.length > LAST_NAME_MAX_LENGTH) {
    return LAST_NAME_MAX_LENGTH_ERROR_MESSAGE;
  } else {
    return null;
  }
};

export const validateDate = (date) => {
  const datePattern = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (!isValid(date, datePattern)) {
    return "Please enter a valid date";
  } else {
    return null;
  }
};
