import formStyles from "../../../commonCSS/Form.module.css";
import buttonStyles from "../../../commonCSS/Button.module.css";
import styles from "./UpdateEmailForm.module.css";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { updateCredentialsServiceFactory } from "../../../services/updateCredentialsService";
import { useService } from "../../../hooks/useService";
import { validateEmail } from "./UpdateEmailFormValidator";

const FormKeys = {
  Email: "email",
  Password: "password",
};

export const UpdateEmailForm = () => {
  const updateCredentialsService = useService(updateCredentialsServiceFactory);
  const { userId, getOne } = useAuthContext();

  const [values, setValues] = useState({
    [FormKeys.Email]: { value: "", focusField: false, error: null },
    [FormKeys.Password]: { value: "", focusField: false, error: null },
  });

  useEffect(() => {
    getOne(userId)
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

    const data = {
      email: values[FormKeys.Email].value,
      password: values[FormKeys.Password].value,
    };

    try {
      await updateCredentialsService.updateEmail(userId, data);

      setValues((prevValues) => ({
        email: { ...prevValues.email, error: null },
        password: { ...prevValues.password, error: null },
      }));
    } catch (err) {
      if (err.message === "Invalid email format.") {
        values[FormKeys.Password].error = null;
      } else {
        values[FormKeys.Password].error = err.message;
      }
      console.log(err.message);
    }

    values[FormKeys.Email].error = validateEmail(values[FormKeys.Email].value);

    if (
      values[FormKeys.Email].error === null &&
      values[FormKeys.Password].error === null
    ) {
      await updateCredentialsService.updateEmail(userId, data);
    }
  };

  return (
    <form method="POST" onSubmit={onSubmit} className={styles["modal-dialog"]}>
      {/* {values && ( */}
      <div className={`${styles["modal-dialog"]} ${styles["slideIn"]}`}>
        <div className={`${styles["field-box"]}`}>
          <div
            className={`${formStyles["filed-container"]} ${
              values[FormKeys.Email].error ? formStyles["error"] : ""
            }`}
          >
            <div
              onClick={() => onFocusField("email")}
              onBlur={onBlurField}
              className={formStyles["input-field-container-name"]}
            >
              <p
                className={
                  values[FormKeys.Email]["focusField"]
                    ? formStyles["placeholder-on-blur"]
                    : formStyles["placeholder"]
                }
              >
                New Email Address *
              </p>
              {values[FormKeys.Email]["focusField"] && (
                <input
                  className={formStyles["input-spot"]}
                  type="text"
                  name={FormKeys.Email}
                  id="email"
                  value={values[FormKeys.Email].value}
                  onChange={(e) =>
                    changeHandler(FormKeys.Email, e.target.value)
                  }
                  autoFocus
                />
              )}
            </div>
          </div>
          {values[FormKeys.Email].error && (
            <div className={formStyles["error-message"]}>
              {values[FormKeys.Email].error}
            </div>
          )}
        </div>
        <div className={`${styles["field-box"]}`}>
          <div
            className={`${formStyles["filed-container"]} ${
              values[FormKeys.Password].error ? formStyles["error"] : ""
            }`}
          >
            <div
              onClick={() => onFocusField("password")}
              onBlur={onBlurField}
              className={formStyles["input-field-container-name"]}
            >
              <p
                className={
                  values[FormKeys.Password]["focusField"]
                    ? formStyles["placeholder-on-blur"]
                    : formStyles["placeholder"]
                }
              >
                Password *
              </p>
              {values[FormKeys.Password]["focusField"] && (
                <input
                  className={`${formStyles["input-spot"]} ${styles["password-input"]}`}
                  type="password"
                  name={FormKeys.Password}
                  id="password"
                  value={values[FormKeys.Password].value}
                  onChange={(e) =>
                    changeHandler(FormKeys.Password, e.target.value)
                  }
                  autoFocus
                />
              )}
            </div>
          </div>
          {values[FormKeys.Password].error && (
            <div className={formStyles["error-message"]}>
              {values[FormKeys.Password].error}
            </div>
          )}
        </div>
        <div>
          <input
            className={`${buttonStyles["button"]} ${styles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
            type="submit"
            value="Save"
          />
        </div>
      </div>
      {/* )} */}
    </form>
  );
};
