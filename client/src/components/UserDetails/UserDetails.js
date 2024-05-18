import styles from "../UserDetails/UserDetails.module.css";
import buttonStyles from "../../commonCSS/Button.module.css";
import colorStyles from "../../commonCSS/Colors.module.css";
import { profileServiceFactory } from "../../services/profileService";
import { AddressBook } from "./AddressBook/AddressBook";
import { UpdateEmail } from "./UpdateEmail/UpdateEmail";
import { UpdatePassword } from "./UpdatePassword/UpdatePassword";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useService } from "../../hooks/useService";
import formStyles from "../../commonCSS/Form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { authServiceFactory } from "../../services/authService";

const FormKeys = {
  FirstName: "firstName",
  LastName: "lastName",
  Birthday: "birthday",
  SpecialDay: "specialDay",
};

export const UserDetails = () => {
  const profileService = useService(profileServiceFactory);
  const { userId} = useContext(AuthContext);
  const authService = useService(authServiceFactory);
  const [user, setUser] = useState([]);

  const [values, setValues] = useState({
    [FormKeys.FirstName]: { value: "", focusField: false },
    [FormKeys.LastName]: { value: "", focusField: false },
    [FormKeys.Birthday]: { value: "", focusField: false },
    [FormKeys.SpecialDay]: { value: "", focusField: false },
  });

  const firstName = values[FormKeys.FirstName].value;

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

  useEffect (() => {
    authService.getOne(userId)
    .then((dataFromServer) => {
        setUser(dataFromServer)
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [user])

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

  const [showAddressBook, setShowAddressBook] = useState(false);

  const onAddressBookClick = async () => {
    document.body.style.overflow = "hidden";
    setShowAddressBook(true);
  };

  const onAddressBookSubmit = () => {
    document.body.style.overflow = "visible";
    setShowAddressBook(false);
  };

  const onCloseAddressBook = () => {
    document.body.style.overflow = "visible";
    setShowAddressBook(false);
  };

  const [showUpdateEmail, setShowUpdateEmail] = useState(false);

  const onUpdateEmailClick = async () => {
    setShowUpdateEmail(true);
    setShowUpdatePassword(false);
  };

  const onUpdateEmailSubmit = () => {
    setShowUpdateEmail();
  };


  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  const onUpdatePasswordClick = async () => {
    setShowUpdatePassword(true);
    setShowUpdateEmail(false);
  };

  const onUpdatePasswordSubmit = () => {
    setShowUpdatePassword();
  };


  return (
    <section className={styles["user-details-box"]}>
      <h2 className={styles["title"]}>Hi, {firstName}</h2>
      <p className={styles["subtitle"]}>
        You can access all your previous transactions, set default shipping
        addresses for faster checkout as well as save items to your wishlist for
        quick access.
      </p>
      <hr className={styles["horizontal-line"]} />
      <div className={styles["user-details-container"]}>
        <div className={styles["left-container"]}>
          <div className={styles["left-upper-sub-container"]}>
            <h3 className={styles["container-title"]}>Personal Information</h3>
            <div className={styles["upper-sub-sub-container"]}>
              <form
                className={styles["profile-form-container"]}
                method="POST"
                onSubmit={onSubmit}
              >
                <div className={`${formStyles["filed-container"]}`}>
                  <div
                    onClick={() => onFocusField("firstName")}
                    onBlur={onBlurField}
                    className={formStyles["input-field-container-profile"]}
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
                    className={formStyles["input-field-container-profile"]}
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
                    className={formStyles["input-field-container-profile"]}
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
                    className={formStyles["input-field-container-profile"]}
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
            </div>
          </div>
          <div className={styles["left-bottom-sub-container"]}>
            <button
              className={buttonStyles["button"]}
              onClick={() => onAddressBookClick()}
            >
              <div className={styles["orders-button-container"]}>
                <FontAwesomeIcon
                  icon={faFileInvoiceDollar}
                  className={`${colorStyles["dark-pink"]} ${styles["address-icon"]}`}
                />
                <div>View Order History</div>
              </div>
            </button>
          </div>
        </div>
        <div className={styles["right-container"]}>
          <div className={styles["right-upper-sub-container"]}>
            <div className={styles["login-box"]}>
              <h3 className={styles["container-title-login"]}>
                Login Information
              </h3>
              <h5 className={styles["login-subtitle"]}>Email Address</h5>
              <p className={styles["login-email"]}>{user.email}</p>
              <button
                className={`${styles["update"]} ${buttonStyles["button"]}`}
                onClick={() => onUpdateEmailClick()}
              >
                Update Email Address
              </button>
              <button
                className={`${styles["update"]} ${buttonStyles["button"]}`}
                onClick={() => onUpdatePasswordClick()}
              >
                Change Password
              </button>
              {showUpdateEmail && (
                <UpdateEmail onUpdateEmailSubmit={onUpdateEmailSubmit} />
              )}
              {showUpdatePassword && (
                <UpdatePassword
                  onUpdatePasswordSubmit={onUpdatePasswordSubmit}
                />
              )}
              {showAddressBook && (
                <AddressBook
                  onCloseAddressBook={onCloseAddressBook}
                  onAddressBookSubmit={onAddressBookSubmit}
                />
              )}
            </div>
          </div>
          <div className={styles["right-bottom-sub-container"]}>
            <div className={styles["address-box"]}>
              <h3 className={styles["container-title-address"]}>
                Address Book
              </h3>
              <hr className={styles["horizontal-line-address"]} />
              {showAddressBook && (
                <AddressBook
                  onCloseAddressBook={onCloseAddressBook}
                  onAddressBookSubmit={onAddressBookSubmit}
                />
              )}
              <button
                className={buttonStyles["button"]}
                onClick={() => onAddressBookClick()}
              >
                <div className={styles["address-button-container"]}>
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    className={`${colorStyles["dark-pink"]} ${styles["address-icon"]}`}
                  />
                  <div>Add new address book</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
