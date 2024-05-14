import formStyles from "../../../commonCSS/Form.module.css";
import buttonStyles from "../../../commonCSS/Button.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useService } from "../../../hooks/useService";
import { addressBookServiceFactory } from "../../../services/addressBookService";
import styles from "../AddressBook/AddressBook.module.css";

const FormKeys = {
  FirstName: "firstName",
  LastName: "lastName",
  PhoneNumber: "phoneNumber",
  Country: "country",
  City: "city",
  Address: "address",
};

export const AddressBook = ({ onCloseAddressBook, onAddressBookSubmit }) => {
  const addressBookService = useService(addressBookServiceFactory);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    addressBookService
      .display(userId)
      .then(setValues)
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [values, setValues] = useState({
    [FormKeys.FirstName]: "",
    [FormKeys.LastName]: "",
    [FormKeys.PhoneNumber]: "",
    [FormKeys.Country]: "",
    [FormKeys.City]: "",
    [FormKeys.Address]: "",
  });

  const changeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    onAddressBookSubmit();

    await addressBookService.update(userId, values);
  };

  return (
    <>
      {values && (
        <div className={styles["overlay"]}>
          <form method="POST" onSubmit={onSubmit} className={styles["popup"]}>
            <ul role="list">
              <li className={formStyles["form-item"]}>
                <input
                  type="text"
                  name={FormKeys.FirstName}
                  id="firstName"
                  placeholder="First Name"
                  value={values[FormKeys.FirstName]}
                  onChange={changeHandler}
                />
              </li>
              <li className={formStyles["form-item"]}>
                <input
                  type="text"
                  name={FormKeys.LastName}
                  id="lastName"
                  placeholder="Last Name"
                  value={values[FormKeys.LastName]}
                  onChange={changeHandler}
                />
              </li>
              <li className={formStyles["form-item"]}>
                <input
                  type="text"
                  name={FormKeys.PhoneNumber}
                  id="phoneNumber"
                  placeholder="Phone Number"
                  value={values[FormKeys.PhoneNumber]}
                  onChange={changeHandler}
                />
              </li>
              <li className={formStyles["form-item"]}>
                <input
                  type="text"
                  name={FormKeys.Country}
                  id="country"
                  placeholder="Country"
                  value={values[FormKeys.Country]}
                  onChange={changeHandler}
                />
              </li>
              <li className={formStyles["form-item"]}>
                <input
                  type="text"
                  name={FormKeys.City}
                  id="city"
                  placeholder="City"
                  value={values[FormKeys.City]}
                  onChange={changeHandler}
                />
              </li>
              <li className={formStyles["form-item"]}>
                <input
                  type="text"
                  name={FormKeys.Address}
                  id="address"
                  placeholder="Address"
                  value={values[FormKeys.Address]}
                  onChange={changeHandler}
                />
              </li>
            </ul>
            <input
              className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
              type="submit"
              value="Save"

            />
            <button
              onClick={() => onCloseAddressBook()}
              className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};
