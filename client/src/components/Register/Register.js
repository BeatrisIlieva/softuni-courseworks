import formStyles from "../../commonCSS/Form.module.css";
import registerStyles from "./Register.module.css";
import colorStyles from "../../commonCSS/Colors.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import buttonStyles from "../../commonCSS/Button.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { QuestionMarkEmail } from "../Register/QuestionMarkEmail";

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
  const { values, changeHandler, onSubmit } = useForm(
    {
      [RegisterFormKeys.Email]: "",
      [RegisterFormKeys.RetypeEmail]: "",
      [RegisterFormKeys.Password]: "",
      [RegisterFormKeys.RetypePassword]: "",
      [RegisterFormKeys.FirstName]: "",
      [RegisterFormKeys.LastName]: "",
    },
    onRegisterSubmit
  );

  const [hoveredQuestionMarkEmail, setHoveredQuestionMarkEmail] =
    useState(false);

  const onHoverQuestionMarkEmail = () => {
    setHoveredQuestionMarkEmail(true);
  };

  const onUnhoverQuestionMarkEmail = () => {
    setHoveredQuestionMarkEmail(false);
  };

  const [focusField, setFocusField] = useState(false);

  const onFocusField = () => {
    setFocusField(true);
  };

  const onNotFocusedField = () => {
    setFocusField(false);
  };

  return (
    <section className={registerStyles["container"]}>
      <h2 className={registerStyles["title"]}>New Customer</h2>
      <form method="POST" onSubmit={onSubmit}>
        <div className={registerStyles["sub-container"]}>
          <div className={registerStyles["left-container"]}>
            <ul role="list">
              <li className={formStyles["filed-container"]}>
                <div
                  onClick={onFocusField}
                  onBlur={onNotFocusedField}
                  className={formStyles["input-field-container"]}
                >
                  <p className={focusField ? formStyles["placeholder-on-blur"] : formStyles["placeholder"]}>First Name*</p>
                  {focusField && (
                    <input
                      className={formStyles["input-spot"]}
                      type="text"
                      name={RegisterFormKeys.FirstName}
                      id="firstName"
                      value={values[RegisterFormKeys.FirstName]}
                      onChange={changeHandler}
                      autoFocus
                    />
                  )}
                </div>
              </li>
              <li
                className={`${formStyles["filed-container"]} ${registerStyles["input-container"]}`}
              >
                <div className={formStyles["input-field-container"]}>
                  <p>Email*</p>
                  <input
                    type="email"
                    name={RegisterFormKeys.Email}
                    id="email"
                    value={values[RegisterFormKeys.Email]}
                    onChange={changeHandler}
                  />
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
              </li>
              <li className={formStyles["filed-container"]}>
                <div className={formStyles["input-field-container"]}>
                  <p>Password*</p>
                  <input
                    type="password"
                    name={RegisterFormKeys.Password}
                    id="password"
                    value={values[RegisterFormKeys.Password]}
                    onChange={changeHandler}
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className={registerStyles["right-container"]}>
            <ul role="list">
              <li className={formStyles["filed-container"]}>
                <div className={formStyles["input-field-container"]}>
                  <p>Last Name*</p>
                  <input
                    type="text"
                    name={RegisterFormKeys.LastName}
                    id="lastName"
                    value={values[RegisterFormKeys.LastName]}
                    onChange={changeHandler}
                  />
                </div>
              </li>
              <li className={formStyles["filed-container"]}>
                <div className={formStyles["input-field-container"]}>
                  <p>Retype Email Address*</p>
                  <input
                    type="email"
                    name={RegisterFormKeys.RetypeEmail}
                    id="email"
                    value={values[RegisterFormKeys.RetypeEmail]}
                    onChange={changeHandler}
                  />
                </div>
              </li>

              <li className={formStyles["filed-container"]}>
                <div className={formStyles["input-field-container"]}>
                  <p>Retype Password*</p>
                  <input
                    type="password"
                    name={RegisterFormKeys.RetypePassword}
                    id="retypePassword"
                    value={values[RegisterFormKeys.RetypePassword]}
                    onChange={changeHandler}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <input
          className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
          type="submit"
          value="Sign Up"
        />
      </form>

      {/* <div className={formStyles["form-vertical-line"]}></div>
      <div className={formStyles["right-form-container"]}>
        <h3 className={registerStyles["form-title"]}>Password Requirements:</h3>
        <ul
          role="list"
          className={`${formStyles["form-list"]} ${registerStyles["equal-height"]}`}
        >
          <li className={formStyles["form-item-list"]}>Your password must contain at least 8 characters.</li>
          <li className={formStyles["form-item-list"]}>
          Your password can't be entirely numeric.
          </li>
          <li className={formStyles["form-item-list"]}>Your password can't be entirely alphabetic.</li>
        </ul>
      </div> */}
    </section>
  );
};
