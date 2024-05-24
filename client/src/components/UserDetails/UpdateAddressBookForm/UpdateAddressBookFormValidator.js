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
  PHONE_NUMBER_MIN_LENGTH,
  PHONE_NUMBER_MAX_LENGTH,
  PHONE_NUMBER_MIN_LENGTH_ERROR_MESSAGE,
  PHONE_NUMBER_MAX_LENGTH_ERROR_MESSAGE,
  ONLY_DIGITS_PHONE_NUMBER_EXCEPTION_MESSAGE,
  COUNTRY_MIN_LENGTH,
  COUNTRY_MAX_LENGTH,
  COUNTRY_MIN_LENGTH_ERROR_MESSAGE,
  COUNTRY_MAX_LENGTH_ERROR_MESSAGE,
  ONLY_LETTERS_COUNTRY_EXCEPTION_MESSAGE,
  CITY_MIN_LENGTH,
  CITY_MAX_LENGTH,
  CITY_MIN_LENGTH_ERROR_MESSAGE,
  CITY_MAX_LENGTH_ERROR_MESSAGE,
  ONLY_LETTERS_CITY_EXCEPTION_MESSAGE,
  ADDRESS_MIN_LENGTH,
  ADDRESS_MAX_LENGTH,
  ADDRESS_MIN_LENGTH_ERROR_MESSAGE,
  ADDRESS_MAX_LENGTH_ERROR_MESSAGE,
} from "../../../constants/updateAddressBookFormConstants";

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

export const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberPattern = /^[0-9]+$/;
  if (!isValid(phoneNumber, phoneNumberPattern)) {
    return ONLY_DIGITS_PHONE_NUMBER_EXCEPTION_MESSAGE;
  } else if (phoneNumber.length < PHONE_NUMBER_MIN_LENGTH) {
    return PHONE_NUMBER_MIN_LENGTH_ERROR_MESSAGE;
  } else if (phoneNumber.length > PHONE_NUMBER_MAX_LENGTH) {
    return PHONE_NUMBER_MAX_LENGTH_ERROR_MESSAGE;
  } else {
    return null;
  }
};

export const validateCountry = (country) => {
  const countryPattern = /^[A-za-z]+$/;

  if (!isValid(country, countryPattern)) {
    return ONLY_LETTERS_COUNTRY_EXCEPTION_MESSAGE;
  } else if (country.length < COUNTRY_MIN_LENGTH) {
    return COUNTRY_MIN_LENGTH_ERROR_MESSAGE;
  } else if (country.length > COUNTRY_MAX_LENGTH) {
    return COUNTRY_MAX_LENGTH_ERROR_MESSAGE;
  } else {
    return null;
  }
};

export const validateCity = (city) => {
  const cityPattern = /^[A-za-z]+$/;

  if (!isValid(city, cityPattern)) {
    return ONLY_LETTERS_CITY_EXCEPTION_MESSAGE;
  } else if (city.length < CITY_MIN_LENGTH) {
    return CITY_MIN_LENGTH_ERROR_MESSAGE;
  } else if (city.length > CITY_MAX_LENGTH) {
    return CITY_MAX_LENGTH_ERROR_MESSAGE;
  } else {
    return null;
  }
};

export const validateAddress = (address) => {
  if (address.length < ADDRESS_MIN_LENGTH) {
    return ADDRESS_MIN_LENGTH_ERROR_MESSAGE;
  } else if (address.length > ADDRESS_MAX_LENGTH) {
    return ADDRESS_MAX_LENGTH_ERROR_MESSAGE;
  } else {
    return null;
  }
};
