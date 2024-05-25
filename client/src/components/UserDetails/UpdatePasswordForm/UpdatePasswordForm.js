import formStyles from "../../../commonCSS/Form.module.css";
import buttonStyles from "../../../commonCSS/Button.module.css";
import { useState } from "react";
import styles from "../UpdateEmailForm/UpdateEmailForm.module.css";
import {
  validatePassword,
  validatePasswordMismatch,
} from "./UpdatePasswordFormValidator";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useService } from "../../../hooks/useService";
import { updateCredentialsServiceFactory } from "../../../services/updateCredentialsService";

const FormKeys = {
  OldPassword: "oldPassword",
  NewPassword: "newPassword",
  RetypeNewPassword: "retypeNewPassword",
};

export const UpdatePasswordForm = () => {
  const updateCredentialsService = useService(updateCredentialsServiceFactory);
  const { userId } = useAuthContext();

  const [values, setValues] = useState({
    [FormKeys.OldPassword]: { value: "", focusField: false, error: null },
    [FormKeys.NewPassword]: { value: "", focusField: false, error: null },
    [FormKeys.RetypeNewPassword]: { value: "", focusField: false, error: null },
  });

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

    const oldPasswordError = validatePassword(
      values[FormKeys.OldPassword].value
    );

    const newPasswordError = validatePassword(
      values[FormKeys.NewPassword].value
    );

    const retypeNewPasswordError = validatePassword(
      values[FormKeys.RetypeNewPassword].value
    );

    const passwordMismatch = validatePasswordMismatch(
      values[FormKeys.NewPassword].value,
      values[FormKeys.RetypeNewPassword].value
    );

    values[FormKeys.OldPassword].error = oldPasswordError;

    values[FormKeys.NewPassword].error = newPasswordError
      ? newPasswordError
      : passwordMismatch;

    values[FormKeys.RetypeNewPassword].error = retypeNewPasswordError
      ? retypeNewPasswordError
      : passwordMismatch;

    if (
      oldPasswordError ||
      newPasswordError ||
      retypeNewPasswordError ||
      passwordMismatch
    ) {
      return;
    } else {
      try {
        const data = {
          oldPassword: values.oldPassword.value,
          newPassword: values.newPassword.value,
        };

        await updateCredentialsService.changePassword(userId, data);
      } catch (err) {
        values[FormKeys.OldPassword].error = err.message;

        console.log(err.message);
      }
    }
  };

  return (
    <form method="POST" onSubmit={onSubmit} className={styles["modal-dialog"]}>
      {values && (
        <div className={`${styles["modal-dialog"]} ${styles["slideIn"]}`}>
          <div className={`${styles["field-box"]}`}>
            <div
              className={`${formStyles["filed-container"]} ${
                values[FormKeys.OldPassword].error ? formStyles["error"] : ""
              }`}
            >
              <div
                onClick={() => onFocusField("oldPassword")}
                onBlur={onBlurField}
                className={formStyles["input-field-container-name"]}
              >
                <p
                  className={
                    values[FormKeys.OldPassword]["focusField"]
                      ? formStyles["placeholder-on-blur"]
                      : formStyles["placeholder"]
                  }
                >
                  Old Password *
                </p>
                {values[FormKeys.OldPassword]["focusField"] && (
                  <input
                    className={formStyles["input-spot"]}
                    type="password"
                    name={FormKeys.OldPassword}
                    id="oldPassword"
                    value={values[FormKeys.OldPassword].value}
                    onChange={(e) =>
                      changeHandler(FormKeys.OldPassword, e.target.value)
                    }
                    autoFocus
                  />
                )}
              </div>
            </div>
            {values[FormKeys.OldPassword].error && (
              <div className={formStyles["error-message"]}>
                {values[FormKeys.OldPassword].error}
              </div>
            )}
          </div>
          <div className={`${styles["field-box"]}`}>
            <div
              className={`${formStyles["filed-container"]} ${
                values[FormKeys.NewPassword].error ? formStyles["error"] : ""
              }`}
            >
              <div
                onClick={() => onFocusField("newPassword")}
                onBlur={onBlurField}
                className={formStyles["input-field-container-name"]}
              >
                <p
                  className={
                    values[FormKeys.NewPassword]["focusField"]
                      ? formStyles["placeholder-on-blur"]
                      : formStyles["placeholder"]
                  }
                >
                  New Password *
                </p>
                {values[FormKeys.NewPassword]["focusField"] && (
                  <input
                    className={formStyles["input-spot"]}
                    type="password"
                    name={FormKeys.NewPassword}
                    id="newPassword"
                    value={values[FormKeys.NewPassword].value}
                    onChange={(e) =>
                      changeHandler(FormKeys.NewPassword, e.target.value)
                    }
                    autoFocus
                  />
                )}
              </div>
            </div>
            {values[FormKeys.NewPassword].error && (
              <div className={formStyles["error-message"]}>
                {values[FormKeys.NewPassword].error}
              </div>
            )}
          </div>
          <div className={`${styles["field-box"]}`}>
            <div
              className={`${formStyles["filed-container"]} ${
                values[FormKeys.RetypeNewPassword].error
                  ? formStyles["error"]
                  : ""
              }`}
            >
              <div
                onClick={() => onFocusField("retypeNewPassword")}
                onBlur={onBlurField}
                className={formStyles["input-field-container-name"]}
              >
                <p
                  className={
                    values[FormKeys.RetypeNewPassword]["focusField"]
                      ? formStyles["placeholder-on-blur"]
                      : formStyles["placeholder"]
                  }
                >
                  Retype New Password *
                </p>
                {values[FormKeys.RetypeNewPassword]["focusField"] && (
                  <input
                    className={formStyles["input-spot"]}
                    type="password"
                    name={FormKeys.RetypeNewPassword}
                    id="retypeNewPassword"
                    value={values[FormKeys.RetypeNewPassword].value}
                    onChange={(e) =>
                      changeHandler(FormKeys.RetypeNewPassword, e.target.value)
                    }
                    autoFocus
                  />
                )}
              </div>
            </div>
            {values[FormKeys.RetypeNewPassword].error && (
              <div className={formStyles["error-message"]}>
                {values[FormKeys.RetypeNewPassword].error}
              </div>
            )}
          </div>
          <div>
            <input
              className={`${buttonStyles["button"]} ${styles["button"]}  ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
              type="submit"
              value="Save"
            />
          </div>
        </div>
      )}
    </form>
  );
};
