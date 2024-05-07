import formStyles from "../../commonCSS/Form.module.css";
import registerStyles from "../Register/Register.module.css"
import buttonStyles from "../../commonCSS/Button.module.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { authServiceFactory } from "../../services/authService";
import { useState, useEffect } from "react";
import { useService } from "../../hooks/useService";

const PersonalDetailsFormKeys = {
  FirstName: "firstName",
  LastName: "lastName",
};


export const UserDetails = () => {
  const [details, setDetails] = useState([]);
  const authService = useService(authServiceFactory);

  useEffect(() => {
    authService
      .getPersonalDetails()
      .then(setDetails)
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(details);



    const { onEditPersonalDetailsSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm(
      {
        [PersonalDetailsFormKeys.FirstName]: "",
        [PersonalDetailsFormKeys.LastName]: "",
      },
      onEditPersonalDetailsSubmit
    );
    
    return (
      
<>
{details && (
          <form method="POST" onSubmit={onSubmit}>
          <ul role="list" className={registerStyles["equal-height"]}>
            <li className={formStyles["form-item"]}>
              <input
                type="text"
                name={PersonalDetailsFormKeys.FirstName}
                id="firstName"
                placeholder="First Name"
                value={values[PersonalDetailsFormKeys.FirstName]}
                onChange={changeHandler}
              />
            </li>
            <li className={formStyles["form-item"]}>
            <input
                type="text"
                name={PersonalDetailsFormKeys.LastName}
                id="lastName"
                placeholder="Last Name"
                value={values[PersonalDetailsFormKeys.LastName]}
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
)}
</>
    )
}


