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
  RetypePassword: "retypePassword",
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

  return (
    <section>
      <h2 className={registerStyles["register-form-title"]}>New Customer</h2>
      <form method="POST" onSubmit={onSubmit}>
        <div className={registerStyles["form-container"]}>
          <div className={formStyles["left-form-container"]}>
            <ul role="list" className={registerStyles["equal-height"]}>
              <li className={formStyles["input-field"]}>
                <div className={formStyles["filed-container"]}>
                  <p>First Name*</p>
                  <input
                    type="text"
                    name={RegisterFormKeys.FirstName}
                    id="firstName"
                    // placeholder="First Name"
                    value={values[RegisterFormKeys.FirstName]}
                    onChange={changeHandler}
                  />
                </div>
              </li>
              <li className={formStyles["form-item"]}>
                <input
                  type="text"
                  name={RegisterFormKeys.LastName}
                  id="lastName"
                  placeholder="Last Name"
                  value={values[RegisterFormKeys.LastName]}
                  onChange={changeHandler}
                />
              </li>
              <li
                className={`${formStyles["form-item"]} ${registerStyles["input-container"]}`}
              >
                <input
                  type="email"
                  name={RegisterFormKeys.Email}
                  id="email"
                  placeholder="Email"
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
              </li>
            </ul>
          </div>
          <div className={formStyles["right-form-container"]}>
            <ul role="list" className={registerStyles["equal-height"]}>
              <li className={formStyles["form-item"]}>
                <input
                  type="email"
                  name={RegisterFormKeys.RetypeEmail}
                  id="email"
                  placeholder="Retype Email Address"
                  value={values[RegisterFormKeys.RetypeEmail]}
                  onChange={changeHandler}
                />
              </li>
              <li className={formStyles["form-item"]}>
                <input
                  type="password"
                  name={RegisterFormKeys.Password}
                  id="password"
                  placeholder="Password"
                  value={values[RegisterFormKeys.Password]}
                  onChange={changeHandler}
                />
              </li>
              <li className={formStyles["form-item"]}>
                <input
                  type="password"
                  name={RegisterFormKeys.RetypePassword}
                  id="retypePassword"
                  placeholder="Retype Password"
                  value={values[RegisterFormKeys.RetypePassword]}
                  onChange={changeHandler}
                />
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
