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
import { useFormNotAuthUser } from "../../hooks/useFormNotAuthUser";

const FormKeys = {
  Email: "email",
  Password: "password",
  RetypeEmail: "retypeEmail",
  RetypePassword: "retypePassword",
  FirstName: "firstName",
  LastName: "lastName",
};

export const Register = () => {
  const { onRegisterSubmit } = useContext(AuthContext);

  const { values, changeHandler, onFocusField, onBlurField, onSubmit } =
    useFormNotAuthUser(
      {
        [FormKeys.Email]: { value: "", focusField: false },
        [FormKeys.RetypeEmail]: { value: "", focusField: false },
        [FormKeys.Password]: { value: "", focusField: false },
        [FormKeys.RetypePassword]: { value: "", focusField: false },
        [FormKeys.FirstName]: { value: "", focusField: false },
        [FormKeys.LastName]: { value: "", focusField: false },
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

  const options = [
    "Is at least eight characters in length",
    "Contains at least one letter",
    "Contains at least one number",
  ];

  const title = "Password Requirements";

  const subtitle = "Please ensure your password:";

  return (
    <section className={registerStyles["register-box"]}>
      <div className={registerStyles["register-image"]}>
        <img
          className={registerStyles["register-image-img "]}
          src="https://res.cloudinary.com/deztgvefu/image/upload/v1715634191/template_images/herolarged_ny24_plp_cl_earrings_qswzmg.avif"
          alt="image"
        />
      </div>
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
                values[FormKeys.FirstName]["focusField"]
                  ? formStyles["placeholder-on-blur"]
                  : formStyles["placeholder"]
              }
            >
              First Name*
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
                values[FormKeys.LastName]["focusField"]
                  ? formStyles["placeholder-on-blur"]
                  : formStyles["placeholder"]
              }
            >
              Last Name*
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
                values[FormKeys.Email]["focusField"]
                  ? formStyles["placeholder-on-blur"]
                  : formStyles["placeholder"]
              }
            >
              Email*
            </p>
            {values[FormKeys.Email]["focusField"] && (
              <input
                className={formStyles["input-spot"]}
                type="email"
                name={FormKeys.Email}
                id="email"
                value={values[FormKeys.Email].value}
                onChange={(e) => changeHandler(FormKeys.Email, e.target.value)}
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
                values[FormKeys.RetypeEmail]["focusField"]
                  ? formStyles["placeholder-on-blur"]
                  : formStyles["placeholder"]
              }
            >
              Retype Email Address*
            </p>
            {values[FormKeys.RetypeEmail]["focusField"] && (
              <input
                className={formStyles["input-spot"]}
                type="email"
                name={FormKeys.RetypeEmail}
                id="retypeEmail"
                value={values[FormKeys.RetypeEmail].value}
                onChange={(e) =>
                  changeHandler(FormKeys.RetypeEmail, e.target.value)
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
                values[FormKeys.Password]["focusField"]
                  ? formStyles["placeholder-on-blur"]
                  : formStyles["placeholder"]
              }
            >
              Password*
            </p>
            {values[FormKeys.Password]["focusField"] && (
              <input
                className={formStyles["input-spot"]}
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
                values[FormKeys.RetypePassword]["focusField"]
                  ? formStyles["placeholder-on-blur"]
                  : formStyles["placeholder"]
              }
            >
              Retype Password*
            </p>
            {values[FormKeys.RetypePassword]["focusField"] && (
              <input
                className={formStyles["input-spot"]}
                type="password"
                name={FormKeys.RetypePassword}
                id="retypePassword"
                value={values[FormKeys.RetypePassword].value}
                onChange={(e) =>
                  changeHandler(FormKeys.RetypePassword, e.target.value)
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
          <hr className={registerStyles["horizontal-line"]} />
          <ToggleMenu options={options} title={title} subtitle={subtitle} />
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
