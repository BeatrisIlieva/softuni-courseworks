import formStyles from "../../../commonCSS/Form.module.css";
import buttonStyles from "../../../commonCSS/Button.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import styles from "../UpdateEmailForm/UpdateEmailForm.module.css";
import { useFormAuthUser } from "../../../hooks/useFormAuthUser";

const FormKeys = {
  OldPassword: "oldPassword",
  NewPassword: "newPassword",
  RetypeNewPassword: "retypeNewPassword",
};

export const UpdatePassword = () => {
  const { onUpdatePasswordSubmit } = useContext(AuthContext);

  const { values, changeHandler, onFocusField, onBlurField, onSubmit } =
    useFormAuthUser(
      {
        [FormKeys.OldPassword]: { value: "", focusField: false },
        [FormKeys.NewPassword]: { value: "", focusField: false },
        [FormKeys.RetypeNewPassword]: { value: "", focusField: false },
      },
      onUpdatePasswordSubmit,
      FormKeys
    );

  return (
    <form method="POST" onSubmit={onSubmit} className={styles["modal-dialog"]}>
      {values && (
        <div className={`${styles["modal-dialog"]} ${styles["slideIn"]}`}>
          <div className={`${formStyles["filed-container"]}`}>
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
          <div className={`${formStyles["filed-container"]}`}>
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
          <div className={`${formStyles["filed-container"]}`}>
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
