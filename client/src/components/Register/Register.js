import formStyles from "../../commonCSS/Form.module.css";
import registerStyles from "./Register.module.css";
import colorStyles from "../../commonCSS/Colors.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import buttonStyles from "../../commonCSS/Button.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { QuestionMarkEmail } from "../Register/QuestionMarkEmail";
import { ToggleMenu } from "../ToggleMenu/ToggleMenu";

const RegisterFormKeys = {
  Email: "email",
  Password: "password",
  RetypeEmail: "retypeEmail",
  RetypePassword: "retypePassword",
  FirstName: "firstName",
  LastName: "lastName",
};

export const Register = () => {
  const { onRegisterSubmit } = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();

    onRegisterSubmit(values);
  };

  const [values, setValues] = useState({
    [RegisterFormKeys.Email]: { value: "", focusField: false },
    [RegisterFormKeys.RetypeEmail]: { value: "", focusField: false },
    [RegisterFormKeys.Password]: { value: "", focusField: false },
    [RegisterFormKeys.RetypePassword]: { value: "", focusField: false },
    [RegisterFormKeys.FirstName]: { value: "", focusField: false },
    [RegisterFormKeys.LastName]: { value: "", focusField: false },
  });

  for (let key in values) {
    if (values[key].value !== "") {
      values[key].focusField = true;
    }
  }

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

  const [hoveredQuestionMarkEmail, setHoveredQuestionMarkEmail] =
    useState(false);

  const onHoverQuestionMarkEmail = () => {
    setHoveredQuestionMarkEmail(true);
  };

  const onUnhoverQuestionMarkEmail = () => {
    setHoveredQuestionMarkEmail(false);
  };

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

  const options = [
    "Is at least eight characters in length",
    "Contains at least one letter",
    "Contains at least one number",
  ];

  const title = "Password Requirements";

  const subtitle= "Please ensure your password:"

  return (
    <section className={registerStyles["register-box"]}>
      <h2 className={registerStyles["register-title"]}>New Customer</h2>
      <form
        className={registerStyles["form-container"]}
        method="POST"
        onSubmit={onSubmit}
      >
        <div
          className={`${formStyles["filed-container"]} ${registerStyles["input-container-left"]}`}
        >
          <div
            onClick={() => onFocusField("firstName")}
            onBlur={onBlurField}
            className={formStyles["input-field-container"]}
          >
            <p
              className={
                values[RegisterFormKeys.FirstName]["focusField"]
                  ? formStyles["placeholder-on-blur"]
                  : formStyles["placeholder"]
              }
            >
              First Name*
            </p>
            {values[RegisterFormKeys.FirstName]["focusField"] && (
              <input
                className={formStyles["input-spot"]}
                type="text"
                name={RegisterFormKeys.FirstName}
                id="firstName"
                value={values[RegisterFormKeys.FirstName].value}
                onChange={(e) =>
                  changeHandler(RegisterFormKeys.FirstName, e.target.value)
                }
                autoFocus
              />
            )}
          </div>
        </div>
        <div
          className={`${formStyles["filed-container"]} ${registerStyles["input-container-right"]}`}
        >
          <div
            onClick={() => onFocusField("lastName")}
            onBlur={onBlurField}
            className={formStyles["input-field-container"]}
          >
            <p
              className={
                values[RegisterFormKeys.LastName]["focusField"]
                  ? formStyles["placeholder-on-blur"]
                  : formStyles["placeholder"]
              }
            >
              Last Name*
            </p>
            {values[RegisterFormKeys.LastName]["focusField"] && (
              <input
                className={formStyles["input-spot"]}
                type="text"
                name={RegisterFormKeys.LastName}
                id="lastName"
                value={values[RegisterFormKeys.LastName].value}
                onChange={(e) =>
                  changeHandler(RegisterFormKeys.LastName, e.target.value)
                }
                autoFocus
              />
            )}
          </div>
        </div>
        <div
          className={`${formStyles["filed-container"]} ${registerStyles["input-container-left"]}`}
        >
          <div
            onClick={() => onFocusField("email")}
            onBlur={onBlurField}
            className={formStyles["input-field-container"]}
          >
            <p
              className={
                values[RegisterFormKeys.Email]["focusField"]
                  ? formStyles["placeholder-on-blur"]
                  : formStyles["placeholder"]
              }
            >
              Email*
            </p>
            {values[RegisterFormKeys.Email]["focusField"] && (
              <input
                className={formStyles["input-spot"]}
                type="email"
                name={RegisterFormKeys.Email}
                id="email"
                value={values[RegisterFormKeys.Email].value}
                onChange={(e) =>
                  changeHandler(RegisterFormKeys.Email, e.target.value)
                }
                autoFocus
              />
            )}
            <span>
              <>{hoveredQuestionMarkEmail && <QuestionMarkEmail />}</>
              <FontAwesomeIcon
                icon={faQuestion}
                className={`${colorStyles["dark-pink"]} ${registerStyles["input-icon"]}`}
                onMouseEnter={() => onHoverQuestionMarkEmail()}
                onMouseLeave={() => onUnhoverQuestionMarkEmail()}
              />
            </span>
          </div>
        </div>
        <div
          className={`${formStyles["filed-container"]} ${registerStyles["input-container-right"]}`}
        >
          <div
            onClick={() => onFocusField("retypeEmail")}
            onBlur={onBlurField}
            className={formStyles["input-field-container"]}
          >
            <p
              className={
                values[RegisterFormKeys.RetypeEmail]["focusField"]
                  ? formStyles["placeholder-on-blur"]
                  : formStyles["placeholder"]
              }
            >
              Retype Email Address*
            </p>
            {values[RegisterFormKeys.RetypeEmail]["focusField"] && (
              <input
                className={formStyles["input-spot"]}
                type="email"
                name={RegisterFormKeys.RetypeEmail}
                id="retypeEmail"
                value={values[RegisterFormKeys.RetypeEmail].value}
                onChange={(e) =>
                  changeHandler(RegisterFormKeys.RetypeEmail, e.target.value)
                }
                autoFocus
              />
            )}
          </div>
        </div>
        <div
          className={`${formStyles["filed-container"]} ${registerStyles["input-container-left"]}`}
        >
          <div
            onClick={() => onFocusField("password")}
            onBlur={onBlurField}
            className={formStyles["input-field-container"]}
          >
            <p
              className={
                values[RegisterFormKeys.Password]["focusField"]
                  ? formStyles["placeholder-on-blur"]
                  : formStyles["placeholder"]
              }
            >
              Password*
            </p>
            {values[RegisterFormKeys.Password]["focusField"] && (
              <input
                className={formStyles["input-spot"]}
                type="password"
                name={RegisterFormKeys.Password}
                id="password"
                value={values[RegisterFormKeys.Password].value}
                onChange={(e) =>
                  changeHandler(RegisterFormKeys.Password, e.target.value)
                }
                autoFocus
              />
            )}
          </div>
        </div>
        <div
          className={`${formStyles["filed-container"]} ${registerStyles["input-container-right"]}`}
        >
          <div
            onClick={() => onFocusField("retypePassword")}
            onBlur={onBlurField}
            className={formStyles["input-field-container"]}
          >
            <p
              className={
                values[RegisterFormKeys.RetypePassword]["focusField"]
                  ? formStyles["placeholder-on-blur"]
                  : formStyles["placeholder"]
              }
            >
              Retype Password*
            </p>
            {values[RegisterFormKeys.RetypePassword]["focusField"] && (
              <input
                className={formStyles["input-spot"]}
                type="password"
                name={RegisterFormKeys.RetypePassword}
                id="retypePassword"
                value={values[RegisterFormKeys.RetypePassword].value}
                onChange={(e) =>
                  changeHandler(RegisterFormKeys.RetypePassword, e.target.value)
                }
                autoFocus
              />
            )}
          </div>
        </div>
        <div className={registerStyles["required-fields"]}>
          * Indicates required fields
        </div>
        <div className={registerStyles["password-requirements"]}>
          <hr className={registerStyles["horizontal-line"]}/>
          <ToggleMenu options={options} title={title} subtitle={subtitle}/>
        </div>
        <input
          className={`${buttonStyles["button"]} ${buttonStyles["register"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
          type="submit"
          value="Sign Up"
        />
      </form>
    </section>
  );
};
