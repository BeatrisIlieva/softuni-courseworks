const isValid = (value, pattern) => {
  return pattern.test(value);
};

const isCardExpired = (expirationDate) => {
  const [month, year] = expirationDate
    .split("/")
    .map((val) => parseInt(val, 10));
  const expiration = new Date("20" + year + "-" + month + "-01");

  const currentDate = new Date();

  if (expiration < currentDate) {
    return true;
  } else {
    return false;
  }
};

export const validateLongCardNumber = (longCardNumber) => {
  const longCardNumberPattern = /^\d{16}$/;

  if (!isValid(longCardNumber, longCardNumberPattern)) {
    return "The card number should be exactly 16 digits long.";
  } else {
    return null;
  }
};

export const validateExpirationDate = (expirationDate) => {
  const expirationDatePattern = /^\d{2}\/\d{2}$/;

  if (!isValid(expirationDate, expirationDatePattern)) {
    return "The expiration date should be in the format MM/YY.";
  } else if (isCardExpired(expirationDate)) {
    return "This card has expired.";
  } else {
    return null;
  }
};

export const validateCVVCode = (CVVCode) => {
  const CVVCodePattern = /^\d{3}$/;

  if (!isValid(CVVCode, CVVCodePattern)) {
    return "The CVV code should be exactly 3 digits long.";
  } else {
    return null;
  }
};
