import formStyles from "../../../commonCSS/Form.module.css";
import buttonStyles from "../../../commonCSS/Button.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useService } from "../../../hooks/useService";
import { authServiceFactory } from "../../../services/authService";
import styles from "../UpdateEmail/UpdateEmail.module.css";
import { useFormAuthUser } from "../../../hooks/useFormAuthUser"



const FormKeys = {
  Email: "email",
  Password: "password",
};

export const UpdateEmail = () => {
  const {onUpdateEmailSubmit} = useContext(AuthContext);

  const { values, changeHandler, onFocusField, onBlurField, onSubmit } =
  useFormAuthUser(
    {
      [FormKeys.Email]: { value: "", focusField: false },
      [FormKeys.Password]: { value: "", focusField: false },
    },
    onUpdateEmailSubmit,
    FormKeys,
  );



  return (
    <form method="POST" onSubmit={onSubmit} className={styles["modal-dialog"]}>
      {values && (
        <div className={`${styles["modal-dialog"]} ${styles["slideIn"]}`}>
          <div className={`${formStyles["filed-container"]}`}>
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
          <div className={`${formStyles["filed-container"]}`}>
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
          <div>
            <input
              className={`${buttonStyles["button"]} ${styles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
              type="submit"
              value="Save"
            />
          </div>
        </div>
      )}
    </form>
  );
};
