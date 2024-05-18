import formStyles from "../../../commonCSS/Form.module.css";
import buttonStyles from "../../../commonCSS/Button.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import styles from "../UpdateEmail/UpdateEmail.module.css";
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





  // const authService = useService(authServiceFactory);
  // const { userId } = useContext(AuthContext);

  // const [values, setValues] = useState({
  //   [FormKeys.OldPassword]: { value: "", focusField: false },
  //   [FormKeys.NewPassword]: { value: "", focusField: false },
  //   [FormKeys.RetypeNewPassword]: { value: "", focusField: false },
  // });

  // useEffect(() => {
  //   authService
  //     .getOne(userId)
  //     .then((dataFromServer) => {
  //       const updatedValues = { ...values };
  //       for (let key in FormKeys) {
  //         updatedValues[FormKeys[key]] = {
  //           value: dataFromServer[FormKeys[key]],
  //           focusField: true ? dataFromServer[FormKeys[key]] : false,
  //         };
  //       }
  //       setValues(updatedValues);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  // const changeHandler = (fieldKey, newValue) => {
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     [fieldKey]: { ...prevValues[fieldKey], value: newValue },
  //   }));
  // };

  // const onFocusField = (fieldKey) => {
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     [fieldKey]: { ...prevValues[fieldKey], focusField: true },
  //   }));
  // };

  // const onBlurField = () => {
  //   setValues((prevValues) => {
  //     const updatedValues = { ...prevValues };
  //     for (let key in updatedValues) {
  //       updatedValues[key].focusField = true ? values[key].value : false;
  //     }

  //     return updatedValues;
  //   });
  // };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
    
  //     const NewPassword = values[FormKeys.NewPassword].value;
  //     const RetypeNewPassword  = values[FormKeys.RetypeNewPassword].value;


  //   if (RetypeNewPassword !== NewPassword) {
  //     console.log("Passwords do not match!");
  //     return;
  //   }

  //   onUpdatePasswordSubmit();

  //   const data = {
  //     [FormKeys.OldPassword]: values[FormKeys.OldPassword].value,
  //     [FormKeys.NewPassword]: values[FormKeys.NewPassword].value,
  //   };

  //   await authService.changePassword(userId, data);
  // };

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
