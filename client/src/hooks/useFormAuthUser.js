import { useState, useEffect, useContext } from "react";
import { authServiceFactory } from "../services/authService";
import { useService } from "./useService";
import { AuthContext } from "../contexts/AuthContext";

export const useFormAuthUser = (initialValues, submitHandler, FormKeys) => {
  const authService = useService(authServiceFactory);
  const { userId } = useContext(AuthContext);
  const [values, setValues] = useState(initialValues);


  useEffect(() => {
    authService
      .getOne(userId)
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

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await submitHandler(userId, values);

  };

  return {
    values,
    changeHandler,
    onFocusField,
    onBlurField,
    onSubmit,
  };
};
