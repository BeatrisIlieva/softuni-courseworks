import formStyles from "../../commonCSS/Form.module.css";
import registerStyles from "./Register.module.css"
import buttonStyles from "../../commonCSS/Button.module.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

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
      [RegisterFormKeys.Password]: "",
      [RegisterFormKeys.RetypePassword]: "",
    },
    onRegisterSubmit
  );

  return (
    <section className={formStyles["form-container"]}>
      <div className={formStyles["left-form-container"]}>
        <h2 className={registerStyles["form-title"]}>New Customer</h2>
        <form method="POST" onSubmit={onSubmit}>
          <ul role="list" className={registerStyles["equal-height"]}>
            <li className={formStyles["form-item"]}>
              <input
                type="email"
                name={RegisterFormKeys.Email}
                id="email"
                placeholder="Enter your email"
                value={values[RegisterFormKeys.Email]}
                onChange={changeHandler}
              />
            </li>
            <li className={formStyles["form-item"]}>
              <input
                type="password"
                name={RegisterFormKeys.Password}
                id="password"
                placeholder="Enter your password"
                value={values[RegisterFormKeys.Password]}
                onChange={changeHandler}
              />
            </li>
            <li className={formStyles["form-item"]}>
              <input
                type="password"
                name={RegisterFormKeys.RetypePassword}
                id="retypePassword"
                placeholder="Retype your password"
                value={values[RegisterFormKeys.RetypePassword]}
                onChange={changeHandler}
              />
            </li>
          </ul>
          <input
            className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
            type="submit"
            value="Sign Up"
          />
        </form>
        <div></div>
      </div>
      <div className={formStyles["form-vertical-line"]}></div>
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
      </div>
    </section>
  );
};
