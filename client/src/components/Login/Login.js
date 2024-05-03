import formStyles from "../../commonCSS/Form.module.css";
import buttonStyles from "../../commonCSS/Button.module.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

const LoginFormKeys = {
  Email: "email",
  Password: "password",
};

export const Login = () => {
  const { onLoginSubmit } = useContext(AuthContext);
  const { values, changeHandler, onSubmit } = useForm(
    {
      [LoginFormKeys.Email]: "",
      [LoginFormKeys.Password]: "",
    },
    onLoginSubmit
  );

  return (
    <section className={formStyles["form-container"]}>
      <div className={formStyles["left-form-container"]}>
        <h2 className={formStyles["form-title"]}>Registered Customers</h2>
        <p className={formStyles["form-subtitle"]}>
          Please Sign In to access your account
        </p>
        <form method="POST" onSubmit={onSubmit}>
          <ul role="list" className={formStyles["equal-height"]}>
            <li className={formStyles["form-item"]}>
              <input
                type="email"
                name={LoginFormKeys.Email}
                id="email"
                placeholder="Enter your email"
                value={values[LoginFormKeys.Email]}
                onChange={changeHandler}
              />
            </li>
            <li className={formStyles["form-item"]}>
              <input
                type="password"
                name={LoginFormKeys.Password}
                id="password"
                placeholder="Enter your password"
                value={values[LoginFormKeys.Password]}
                onChange={changeHandler}
              />
            </li>
          </ul>
          <input
            className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
            type="submit"
            value="Sign In"
          />
        </form>
        <div>
        </div>
      </div>
      <div className={formStyles["form-vertical-line"]}></div>
      <div className={formStyles["right-form-container"]}>
        <h2 className={formStyles["form-title"]}>New Customers</h2>
        <p className={formStyles["form-subtitle"]}>
          Register with React Gems for the following benefits:
        </p>
        <ul
          role="list"
          className={`${formStyles["form-list"]} ${formStyles["equal-height"]}`}
        >
          <li className={formStyles["form-item-list"]}>Faster checkout</li>
          <li className={formStyles["form-item-list"]}>
            Access your order status
          </li>
          <li className={formStyles["form-item-list"]}>View order history</li>
          <li className={formStyles["form-item-list"]}>
            Enjoy the convenience of saving your wishlist permanently
          </li>
        </ul>
        {/* <div>
          <input
            className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
            type="submit"
            value="Sign Up"
          />
        </div> */}
      </div>
    </section>
  );
};
