import formStyles from "../../commonCSS/Form.module.css";
import loginStyles from "./Login.module.css";
import buttonStyles from "../../commonCSS/Button.module.css";
import { useAuthContext } from "../../contexts/AuthContext";
// import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useFormNotAuthUser } from "../../hooks/useFormNotAuthUser";

const FormKeys = {
  Email: "email",
  Password: "password",
};

export const Login = () => {
  const { onLoginSubmit } = useAuthContext();
  // const { onLoginSubmit } = useContext(AuthContext);

  const { values, changeHandler, onFocusField, onBlurField, onSubmit } =
    useFormNotAuthUser(
      {
        [FormKeys.Email]: { value: "", focusField: false },
        [FormKeys.Password]: { value: "", focusField: false },
      },
      onLoginSubmit
    );

  return (
    <section className={`${loginStyles["login-box"]}`}>
      <div className={loginStyles["login-image"]}>
        <img
          className={loginStyles["login-image-img"]}
          src="https://res.cloudinary.com/deztgvefu/image/upload/v1715602900/template_images/herolarged_ny24_plp_718_necklace_blue_g0wqz9.jpg"
          alt="image"
        />
      </div>
      <div className={loginStyles["login-container"]}>
        <div className={loginStyles["left-login-container"]}>
          <h2 className={loginStyles["login-title"]}>Registered Customers</h2>
          <p className={loginStyles["login-subtitle"]}>
            Please Sign In to access your account
          </p>
          <form
            className={loginStyles["form-container"]}
            method="POST"
            onSubmit={onSubmit}
          >
            <div className={`${formStyles["filed-container"]}`}>
              <div
                onClick={() => onFocusField("email")}
                onBlur={onBlurField}
                className={formStyles["input-field-container-login"]}
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
                className={formStyles["input-field-container-login"]}
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
            <input
              className={`${buttonStyles["button"]} ${buttonStyles["login"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
              type="submit"
              value="Sign In"
            />
          </form>
        </div>
        <div className={formStyles["form-vertical-line"]}></div>
        <div className={loginStyles["right-login-container"]}>
          <h2 className={loginStyles["login-title"]}>New Customers</h2>
          <p className={loginStyles["login-subtitle"]}>
            Register with React Gems for the following benefits:
          </p>
          <ul
            role="list"
            className={`${formStyles["form-list"]} ${loginStyles["equal-height"]}`}
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
          <Link to="/user/register">
            <div>
              <input
                className={`${buttonStyles["button"]} ${buttonStyles["login"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
                type="submit"
                value="Sign Up"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
