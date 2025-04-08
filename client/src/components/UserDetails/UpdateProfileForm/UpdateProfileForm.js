import { useContext, useState, useEffect } from "react";
import { useService } from "../../../hooks/useService";
import { profileServiceFactory } from "../../../services/profileService";
import { AuthContext } from "../../../contexts/AuthContext";
import styles from "./UpdateProfileForm.module.css";
import formStyles from "../../../commonCSS/Form.module.css";
import buttonStyles from "../../../commonCSS/Button.module.css";
import {
  validateFirstName,
  validateLastName,
  validateDate,
} from "./UpdateProfileFormValidator";

const FormKeys = {
  FirstName: "firstName",
  LastName: "lastName",
  Birthday: "birthday",
  SpecialDay: "specialDay",
};
export const UpdateProfileForm = () => {
  const profileService = useService(profileServiceFactory);
  const { userId } = useContext(AuthContext);

  const [values, setValues] = useState({
    [FormKeys.FirstName]: { value: "", focusField: false, error: null },
    [FormKeys.LastName]: { value: "", focusField: false, error: null },
    [FormKeys.Birthday]: { value: "", focusField: false, error: null },
    [FormKeys.SpecialDay]: { value: "", focusField: false, error: null },
  });

  useEffect(() => {
    profileService
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      [FormKeys.FirstName]: values[FormKeys.FirstName].value,
      [FormKeys.LastName]: values[FormKeys.LastName].value,
      [FormKeys.Birthday]: values[FormKeys.Birthday].value,
      [FormKeys.SpecialDay]: values[FormKeys.SpecialDay].value,
    };

    try {
      values[FormKeys.FirstName].error = validateFirstName(
        values[FormKeys.FirstName].value
      );

      values[FormKeys.LastName].error = validateLastName(
        values[FormKeys.LastName].value
      );

      values[FormKeys.Birthday].error = validateDate(
        values[FormKeys.Birthday].value
      );

      values[FormKeys.SpecialDay].error = validateDate(
        values[FormKeys.SpecialDay].value
      );

      if (
        values[FormKeys.FirstName].error === null &&
        values[FormKeys.LastName].error === null &&
        values[FormKeys.Birthday].error === null &&
        values[FormKeys.SpecialDay].error === null
      ) {
        await profileService.update(userId, data);
      }
    } catch (err) {
      console.log(err);
    }
    const currentValues = { ...values };

    setValues(currentValues);
  };
  return (
    <section>
      <div className={styles["upper-sub-sub-container"]}>
        <form
          className={styles["profile-form-container"]}
          method="POST"
          onSubmit={onSubmit}
        >
          <div className={`${styles["field-box"]}`}>
            <div
              className={`${formStyles["filed-container"]} ${
                values[FormKeys.FirstName].error ? formStyles["error"] : ""
              }`}
            >
              <div
                onClick={() => onFocusField("firstName")}
                onBlur={onBlurField}
                className={formStyles["input-field-container-profile"]}
              >
                <p
                  className={
                    values[FormKeys.FirstName]["focusField"]
                      ? formStyles["placeholder-on-blur"]
                      : formStyles["placeholder"]
                  }
                >
                  First Name
                </p>
                {values[FormKeys.FirstName]["focusField"] && (
                  <input
                    className={formStyles["input-spot"]}
                    type="text"
                    name={FormKeys.FirstName}
                    id="firstName"
                    value={values[FormKeys.FirstName].value}
                    onChange={(e) =>
                      changeHandler(FormKeys.FirstName, e.target.value)
                    }
                    autoFocus
                  />
                )}
              </div>
            </div>
            {values[FormKeys.FirstName].error && (
              <div className={formStyles["error-message"]}>
                {values[FormKeys.FirstName].error}
              </div>
            )}
          </div>
          <div className={`${styles["field-box"]}`}>
            <div
              className={`${formStyles["filed-container"]} ${
                values[FormKeys.LastName].error ? formStyles["error"] : ""
              }`}
            >
              <div
                onClick={() => onFocusField("lastName")}
                onBlur={onBlurField}
                className={formStyles["input-field-container-profile"]}
              >
                <p
                  className={
                    values[FormKeys.LastName]["focusField"]
                      ? formStyles["placeholder-on-blur"]
                      : formStyles["placeholder"]
                  }
                >
                  Last Name
                </p>
                {values[FormKeys.LastName]["focusField"] && (
                  <input
                    className={formStyles["input-spot"]}
                    type="text"
                    name={FormKeys.LastName}
                    id="lastName"
                    value={values[FormKeys.LastName].value}
                    onChange={(e) =>
                      changeHandler(FormKeys.LastName, e.target.value)
                    }
                    autoFocus
                  />
                )}
              </div>
            </div>
            {values[FormKeys.LastName].error && (
              <div className={formStyles["error-message"]}>
                {values[FormKeys.LastName].error}
              </div>
            )}
          </div>
          <div className={`${styles["field-box"]}`}>
            <div
              className={`${formStyles["filed-container"]} ${
                values[FormKeys.Birthday].error ? formStyles["error"] : ""
              }`}
            >
              <div
                onClick={() => onFocusField("birthday")}
                onBlur={onBlurField}
                className={formStyles["input-field-container-profile"]}
              >
                <p
                  className={
                    values[FormKeys.Birthday]["focusField"]
                      ? formStyles["placeholder-on-blur"]
                      : formStyles["placeholder"]
                  }
                >
                  Birthday (MM/DD/YYYY)
                </p>
                {values[FormKeys.Birthday]["focusField"] && (
                  <input
                    className={formStyles["input-spot"]}
                    type="text"
                    name={FormKeys.Birthday}
                    id="birthday"
                    value={values[FormKeys.Birthday].value}
                    onChange={(e) =>
                      changeHandler(FormKeys.Birthday, e.target.value)
                    }
                    autoFocus
                  />
                )}
              </div>
            </div>
            {values[FormKeys.Birthday].error && (
              <div className={formStyles["error-message"]}>
                {values[FormKeys.Birthday].error}
              </div>
            )}
          </div>
          <div className={`${styles["field-box"]}`}>
            <div
              className={`${formStyles["filed-container"]} ${
                values[FormKeys.SpecialDay].error ? formStyles["error"] : ""
              }`}
            >
              <div
                onClick={() => onFocusField("specialDay")}
                onBlur={onBlurField}
                className={formStyles["input-field-container-profile"]}
              >
                <p
                  className={
                    values[FormKeys.SpecialDay]["focusField"]
                      ? formStyles["placeholder-on-blur"]
                      : formStyles["placeholder"]
                  }
                >
                  Anniversary/Wedding (MM/DD/YYYY)
                </p>
                {values[FormKeys.SpecialDay]["focusField"] && (
                  <input
                    className={formStyles["input-spot"]}
                    type="text"
                    name={FormKeys.SpecialDay}
                    id="specialDay"
                    value={values[FormKeys.SpecialDay].value}
                    onChange={(e) =>
                      changeHandler(FormKeys.SpecialDay, e.target.value)
                    }
                    autoFocus
                  />
                )}
              </div>
            </div>
            {values[FormKeys.SpecialDay].error && (
              <div className={formStyles["error-message"]}>
                {values[FormKeys.SpecialDay].error}
              </div>
            )}
          </div>
          <input
            className={`${buttonStyles["button"]} ${buttonStyles["register"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
            type="submit"
            value="Save"
          />
        </form>
      </div>
    </section>
  );
};
