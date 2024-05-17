import { useState } from "react";

export const useFormNotAuthUser = (initialValues, submitHandler) => {
  const [values, setValues] = useState(initialValues);

  const changeHandler = (fieldKey, newValue) => {
    setValues((prevValues) => {
      const updatedValues = { ...prevValues };

      updatedValues[fieldKey].value = newValue;

      Object.keys(updatedValues).forEach((key) => {
        updatedValues[key].focusField = key === fieldKey;
      });

      return updatedValues;
    });
  };

  for (let key in values) {
    if (values[key].value !== "") {
      values[key].focusField = true;
    }
  }

  const onFocusField = (fieldKey) => {
    setValues((prevValues) => {
      const updatedValues = { ...prevValues };

      Object.keys(updatedValues).forEach((key) => {
        updatedValues[key].focusField = key === fieldKey;
      });

      return updatedValues;
    });
  };

  const onBlurField = () => {
    setValues((prevValues) => {
      const updatedValues = { ...prevValues };
      Object.keys(updatedValues).forEach((key) => {
        updatedValues[key].focusField = false;
      });
      return updatedValues;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    submitHandler(values);
  };

  return {
    values,
    changeHandler,
    onFocusField,
    onBlurField,
    onSubmit,
  };
};
