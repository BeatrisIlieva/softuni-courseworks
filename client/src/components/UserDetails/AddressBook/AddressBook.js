import formStyles from "../../../commonCSS/Form.module.css";
import buttonStyles from "../../../commonCSS/Button.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useService } from "../../../hooks/useService";
import { addressBookServiceFactory } from "../../../services/addressBookService";
import styles from "../AddressBook/AddressBook.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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

  const [values, setValues] = useState({
    [FormKeys.FirstName]: { value: "", focusField: false },
    [FormKeys.LastName]: { value: "", focusField: false },
    [FormKeys.PhoneNumber]: { value: "", focusField: false },
    [FormKeys.Country]: { value: "", focusField: false },
    [FormKeys.City]: { value: "", focusField: false },
    [FormKeys.Address]: { value: "", focusField: false },
  });

  useEffect(() => {
    addressBookService
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
      [FormKeys.PhoneNumber]: values[FormKeys.PhoneNumber].value,
      [FormKeys.Country]: values[FormKeys.Country].value,
      [FormKeys.City]: values[FormKeys.City].value,
      [FormKeys.Address]: values[FormKeys.Address].value,
    };

    onAddressBookSubmit();

    await addressBookService.update(userId, data);
  };

  // const [showAddressBook, setShowAddressBook] = useState(false);

  // const onAddressBookClick = async () => {
  //   document.body.style.overflow = "hidden";
  //   setShowAddressBook(true);
  // };

  // const onAddressBookSubmit = () => {
  //   setShowAddressBook(false);
  // };

  // const onCloseAddressBook = () => {
  //   document.body.style.overflow = "visible";
  //   setShowAddressBook(false);
  // };

  // useEffect(() => {
  //   addressBookService
  //     .display(userId)
  //     .then(setValues)
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  // const [values, setValues] = useState({
  //   [FormKeys.FirstName]: "",
  //   [FormKeys.LastName]: "",
  //   [FormKeys.PhoneNumber]: "",
  //   [FormKeys.Country]: "",
  //   [FormKeys.City]: "",
  //   [FormKeys.Address]: "",
  // });

  // const changeHandler = (e) => {
  //   setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  // };

  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   onAddressBookSubmit();

  //   await addressBookService.update(userId, values);
  // };

  return (
    <section
      id={styles["addAddress"]}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      {values && (
        <div className={styles["modal-dialog"]}>
          <div className={styles["modal-content"]}>
            <div className={styles["modal-header"]}>
              <div id={styles["xMark"]}>
                <FontAwesomeIcon icon={faXmark} className={styles["x-mark"]} />
              </div>
              <h2 className={styles["title"]}>Add a New Address</h2>
            </div>
            <div className={styles["modal-body"]}>
              <form
                method="POST"
                onSubmit={onSubmit}
                className={styles["address-book-box"]}
              >
                <div className={`${formStyles["filed-container"]}`}>
                  <div
                    onClick={() => onFocusField("firstName")}
                    onBlur={onBlurField}
                    className={formStyles["input-field-name"]}
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
                <div className={`${formStyles["filed-container"]}`}>
                  <div
                    onClick={() => onFocusField("lastName")}
                    onBlur={onBlurField}
                    className={formStyles["input-field-name"]}
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
                  className={`${formStyles["filed-container"]} ${styles["input-container-left"]}`}
                >
                  <div
                    onClick={() => onFocusField("phoneNumber")}
                    onBlur={onBlurField}
                    className={formStyles["input-field-details"]}
                  >
                    <p
                      className={
                        values[FormKeys.PhoneNumber]["focusField"]
                          ? formStyles["placeholder-on-blur"]
                          : formStyles["placeholder"]
                      }
                    >
                      Phone Number*
                    </p>
                    {values[FormKeys.PhoneNumber]["focusField"] && (
                      <input
                        className={formStyles["input-spot"]}
                        type="text"
                        name={FormKeys.PhoneNumber}
                        id="phoneNumber"
                        value={values[FormKeys.PhoneNumber].value}
                        onChange={(e) =>
                          changeHandler(FormKeys.PhoneNumber, e.target.value)
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
                    onClick={() => onFocusField("country")}
                    onBlur={onBlurField}
                    className={formStyles["input-field-name"]}
                  >
                    <p
                      className={
                        values[FormKeys.Country]["focusField"]
                          ? formStyles["placeholder-on-blur"]
                          : formStyles["placeholder"]
                      }
                    >
                      Country*
                    </p>
                    {values[FormKeys.Country]["focusField"] && (
                      <input
                        className={formStyles["input-spot"]}
                        type="text"
                        name={FormKeys.Country}
                        id="country"
                        value={values[FormKeys.Country].value}
                        onChange={(e) =>
                          changeHandler(FormKeys.Country, e.target.value)
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
                    onClick={() => onFocusField("city")}
                    onBlur={onBlurField}
                    className={formStyles["input-field-name"]}
                  >
                    <p
                      className={
                        values[FormKeys.City]["focusField"]
                          ? formStyles["placeholder-on-blur"]
                          : formStyles["placeholder"]
                      }
                    >
                      City*
                    </p>
                    {values[FormKeys.City]["focusField"] && (
                      <input
                        className={formStyles["input-spot"]}
                        type="text"
                        name={FormKeys.City}
                        id="city"
                        value={values[FormKeys.City].value}
                        onChange={(e) =>
                          changeHandler(FormKeys.City, e.target.value)
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
                    onClick={() => onFocusField("address")}
                    onBlur={onBlurField}
                    className={formStyles["input-field-details"]}
                  >
                    <p
                      className={
                        values[FormKeys.Address]["focusField"]
                          ? formStyles["placeholder-on-blur"]
                          : formStyles["placeholder"]
                      }
                    >
                      Street Address*
                    </p>
                    {values[FormKeys.Address]["focusField"] && (
                      <input
                        className={formStyles["input-spot"]}
                        type="text"
                        name={FormKeys.Address}
                        id="address"
                        value={values[FormKeys.Address].value}
                        onChange={(e) =>
                          changeHandler(FormKeys.Address, e.target.value)
                        }
                        autoFocus
                      />
                    )}
                  </div>
                </div>
                <div className={styles["center"]}>
                  <div>
                    <input
                      className={`${buttonStyles["button"]} ${buttonStyles["save"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
                      type="submit"
                      value="Save"
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => onCloseAddressBook()}
                      className={`${buttonStyles["button"]} ${buttonStyles["data-dismiss"]}`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
