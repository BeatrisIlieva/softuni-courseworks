import styles from "../UserDetails/UserDetails.module.css";
import buttonStyles from "../../commonCSS/Button.module.css";
import { profileServiceFactory } from "../../services/profileService";
import { AddressBook } from "./AddressBook/AddressBook";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useService } from "../../hooks/useService";
import formStyles from "../../commonCSS/Form.module.css";

const FormKeys = {
  FirstName: "firstName",
  LastName: "lastName",
  Birthday: "birthday",
  SpecialDay: "specialDay",
};

export const UserDetails = () => {
  const profileService = useService(profileServiceFactory);
  const { userId } = useContext(AuthContext);

  const [values, setValues] = useState({
    [FormKeys.FirstName]: { value: "", focusField: false },
    [FormKeys.LastName]: { value: "", focusField: false },
    [FormKeys.Birthday]: { value: "", focusField: false },
    [FormKeys.SpecialDay]: { value: "", focusField: false },
  });

  useEffect(() => {
    profileService
      .display(userId)
      .then((dataFromServer) => {
        const updatedValues = { ...values };
        for (let key in FormKeys) {
          updatedValues[FormKeys[key]] = {
            value: dataFromServer[FormKeys[key]],
            focusField: true ? dataFromServer[FormKeys[key]] : false,
          };
        }

        setValues(updatedValues);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const changeHandler = (fieldKey, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: { ...prevValues[fieldKey], value: newValue },
    }));
  };

  const onFocusField = (fieldKey) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: { ...prevValues[fieldKey], focusField: true },
    }));
  };

  const onBlurField = () => {
    setValues((prevValues) => {
      const updatedValues = { ...prevValues };
      for (let key in updatedValues) {
        updatedValues[key].focusField = true ? values[key].value : false;
      }

      return updatedValues;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      [FormKeys.FirstName]: values[FormKeys.FirstName].value,
      [FormKeys.LastName]: values[FormKeys.LastName].value,
      [FormKeys.Birthday]: values[FormKeys.Birthday].value,
      [FormKeys.SpecialDay]: values[FormKeys.SpecialDay].value,
    };

    await profileService.update(userId, data);
  };

  return (
    <>
      <section className={styles["user-box"]}>
        <h2 className={styles["register-title"]}>New Customer</h2>
        <form
          className={styles["form-container"]}
          method="POST"
          onSubmit={onSubmit}
        >
          <div
            className={`${formStyles["filed-container"]} ${styles["input-container-left"]}`}
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
                First Name
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
            className={`${formStyles["filed-container"]} ${styles["input-container-left"]}`}
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
                Last Name
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
            className={`${formStyles["filed-container"]} ${styles["input-container-left"]}`}
          >
            <div
              onClick={() => onFocusField("birthday")}
              onBlur={onBlurField}
              className={formStyles["input-field-container"]}
            >
              <p
                className={
                  values[FormKeys.Birthday]["focusField"]
                    ? formStyles["placeholder-on-blur"]
                    : formStyles["placeholder"]
                }
              >
                Birthday (MM/DD/YYYY)
              </p>
              {values[FormKeys.Birthday]["focusField"] && (
                <input
                  className={formStyles["input-spot"]}
                  type="text"
                  name={FormKeys.Birthday}
                  id="birthday"
                  value={values[FormKeys.Birthday].value}
                  onChange={(e) =>
                    changeHandler(FormKeys.Birthday, e.target.value)
                  }
                  autoFocus
                />
              )}
            </div>
          </div>
          <div
            className={`${formStyles["filed-container"]} ${styles["input-container-left"]}`}
          >
            <div
              onClick={() => onFocusField("specialDay")}
              onBlur={onBlurField}
              className={formStyles["input-field-container"]}
            >
              <p
                className={
                  values[FormKeys.SpecialDay]["focusField"]
                    ? formStyles["placeholder-on-blur"]
                    : formStyles["placeholder"]
                }
              >
                Anniversary/Wedding (MM/DD/YYYY)
              </p>
              {values[FormKeys.SpecialDay]["focusField"] && (
                <input
                  className={formStyles["input-spot"]}
                  type="text"
                  name={FormKeys.SpecialDay}
                  id="specialDay"
                  value={values[FormKeys.SpecialDay].value}
                  onChange={(e) =>
                    changeHandler(FormKeys.SpecialDay, e.target.value)
                  }
                  autoFocus
                />
              )}
            </div>
          </div>
          <input
            className={`${buttonStyles["button"]} ${buttonStyles["register"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
            type="submit"
            value="Save"
          />
        </form>
      </section>
    </>
    // <>
    //   {showAddressBook && (
    //     <AddressBook
    //       onCloseAddressBook={onCloseAddressBook}
    //       onAddressBookSubmit={onAddressBookSubmit}
    //     />
    //   )}
    //   <button onClick={() => onAddressBookClick()}>Add new address book</button>
    // </>
  );
};
