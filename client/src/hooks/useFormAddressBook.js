import { useState, useEffect, useContext } from "react";
import { useService } from "./useService";
import { addressBookServiceFactory } from "../services/addressBookService";
import { AuthContext } from "../contexts/AuthContext";

export const useFormAddressBook = (initialValues, FormKeys) => {
  const addressBookService = useService(addressBookServiceFactory);
  const [values, setValues] = useState(initialValues);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    addressBookService
      .display(userId)
      .then((dataFromServer) => {
        const updatedValues = { ...values };
        for (let key in FormKeys) {
          updatedValues[FormKeys[key]] = {
            value: dataFromServer[FormKeys[key]],
            focusField: true ? dataFromServer[FormKeys[key]] : false,
          };
        }
        setValues(updatedValues);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const changeHandler = (fieldKey, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: { ...prevValues[fieldKey], value: newValue },
    }));
  };

  const onFocusField = (fieldKey) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: { ...prevValues[fieldKey], focusField: true },
    }));
  };

  const onBlurField = () => {
    setValues((prevValues) => {
      const updatedValues = { ...prevValues };
      for (let key in updatedValues) {
        updatedValues[key].focusField = true ? values[key].value : false;
      }

      return updatedValues;
    });
  };

  return {
    values,
    changeHandler,
    onFocusField,
    onBlurField,
  };
};
