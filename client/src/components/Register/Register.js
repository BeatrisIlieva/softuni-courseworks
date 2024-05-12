import formStyles from "../../commonCSS/Form.module.css";
import registerStyles from "./Register.module.css";
import colorStyles from "../../commonCSS/Colors.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import buttonStyles from "../../commonCSS/Button.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
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

  const onSubmit = (e) => {
    e.preventDefault();

    onRegisterSubmit(values);
  };

  const [values, setValues] = useState({
    [RegisterFormKeys.Email]: {"value": "", "focusField": false},
    [RegisterFormKeys.RetypeEmail]: {"value": "", "focusField": false},
    [RegisterFormKeys.Password]: {"value": "", "focusField": false},
    [RegisterFormKeys.RetypePassword]: {"value": "", "focusField": false},
    [RegisterFormKeys.FirstName]: {"value": "", "focusField": false},
    [RegisterFormKeys.LastName]: {"value": "", "focusField": false},
  });


  const changeHandler = (fieldKey, newValue) => {
    setValues(prevValues => {

      const updatedValues = { ...prevValues };
  

      updatedValues[fieldKey].value = newValue;
  

      Object.keys(updatedValues).forEach(key => {
        
        updatedValues[key].focusField = (key === fieldKey);
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
    setValues(prevValues => {

      const updatedValues = { ...prevValues };
  
      Object.keys(updatedValues).forEach(key => {
        updatedValues[key].focusField = (key === fieldKey);
      });
  
      return updatedValues;
    });
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
                  onClick={() => onFocusField("firstName")}
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
                      onChange={(e) => changeHandler(RegisterFormKeys.FirstName, e.target.value)} 
                      autoFocus
                    />
                  )}
                </div>
              </li>
              <li
                className={`${formStyles["filed-container"]} ${registerStyles["input-container"]}`}
              >
                <div
                  onClick={() => onFocusField("email")}
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
                      onChange={(e) => changeHandler(RegisterFormKeys.Email, e.target.value)} 
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
              </li>
              <li className={formStyles["filed-container"]}>
                <div
                  onClick={() => onFocusField("password")}
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
                      type="password"
                      name={RegisterFormKeys.Password}
                      id="password"
                      value={values[RegisterFormKeys.Password].value}
                      onChange={(e) => changeHandler(RegisterFormKeys.Password, e.target.value)} 
                      autoFocus
                    />
                  )}
                </div>
              </li>
            </ul>
          </div>
          <div className={registerStyles["right-container"]}>
            <ul role="list">
              <li className={formStyles["filed-container"]}>
                <div
                  onClick={() => onFocusField("lastName")}
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
                      type="text"
                      name={RegisterFormKeys.LastName}
                      id="lastName"
                      value={values[RegisterFormKeys.LastName].value}
                      onChange={(e) => changeHandler(RegisterFormKeys.LastName, e.target.value)} 
                      autoFocus
                    />
                  )}
                </div>
              </li>
              <li className={formStyles["filed-container"]}>
                <div
                  onClick={() => onFocusField("retypeEmail")}
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
                      type="email"
                      name={RegisterFormKeys.RetypeEmail}
                      id="retypeEmail"
                      value={values[RegisterFormKeys.RetypeEmail].value}
                      onChange={(e) => changeHandler(RegisterFormKeys.RetypeEmail, e.target.value)} 
                      autoFocus
                    />
                  )}
                </div>
              </li>

              <li className={formStyles["filed-container"]}>
                <div
                  onClick={() => onFocusField("retypePassword")}
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
                      type="password"
                      name={RegisterFormKeys.RetypePassword}
                      id="retypePassword"
                      value={values[RegisterFormKeys.RetypePassword].value}
                      onChange={(e) => changeHandler(RegisterFormKeys.RetypePassword, e.target.value)} 
                      autoFocus
                    />
                  )}
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
