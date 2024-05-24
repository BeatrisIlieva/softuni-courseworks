import formStyles from "../../../commonCSS/Form.module.css";
import buttonStyles from "../../../commonCSS/Button.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useService } from "../../../hooks/useService";
import { addressBookServiceFactory } from "../../../services/addressBookService";
import styles from "./UpdateAddressBookForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useFormAddressBook } from "../../../hooks/useFormAddressBook";
import {
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
  validateCity,
  validateCountry,
  validateAddress,
} from "./UpdateAddressBookFormValidator";

const FormKeys = {
  FirstName: "firstName",
  LastName: "lastName",
  PhoneNumber: "phoneNumber",
  Country: "country",
  City: "city",
  Address: "address",
};

export const UpdateAddressBookForm = ({
  onCloseUpdateAddressBook,
  onUpdateAddressBookSubmit,
}) => {
  const addressBookService = useService(addressBookServiceFactory);
  const { userId } = useContext(AuthContext);

  const { values, changeHandler, onFocusField, onBlurField, setValues } =
    useFormAddressBook(
      {
        [FormKeys.FirstName]: { value: "", focusField: false, error: null },
        [FormKeys.LastName]: { value: "", focusField: false, error: null },
        [FormKeys.PhoneNumber]: { value: "", focusField: false, error: null },
        [FormKeys.Country]: { value: "", focusField: false, error: null },
        [FormKeys.City]: { value: "", focusField: false, error: null },
        [FormKeys.Address]: { value: "", focusField: false, error: null },
      },

      FormKeys
    );

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

    try {
      values[FormKeys.FirstName].error = validateFirstName(
        values[FormKeys.FirstName].value
      );

      values[FormKeys.LastName].error = validateLastName(
        values[FormKeys.LastName].value
      );

      values[FormKeys.PhoneNumber].error = validatePhoneNumber(
        values[FormKeys.PhoneNumber].value
      );

      values[FormKeys.Country].error = validateCountry(
        values[FormKeys.Country].value
      );

      values[FormKeys.City].error = validateCity(values[FormKeys.City].value);

      values[FormKeys.Address].error = validateAddress(
        values[FormKeys.Address].value
      );

      if (
        values[FormKeys.FirstName].error === null &&
        values[FormKeys.LastName].error === null &&
        values[FormKeys.PhoneNumber].error === null &&
        values[FormKeys.Country].error === null &&
        values[FormKeys.City].error === null &&
        values[FormKeys.Address].error === null
      ) {
        onUpdateAddressBookSubmit();

        await addressBookService.update(userId, data);
      }

      const currentValues = { ...values };

      setValues(currentValues);
    } catch (err) {
      console.log(err.message);
    }
  };

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
              <div
                id={styles["xMark"]}
                onClick={() => onCloseUpdateAddressBook()}
              >
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
                <div className={`${styles["field-box-smaller"]}`}>
                  <div
                    className={`${formStyles["filed-container"]} ${
                      values[FormKeys.FirstName].error
                        ? formStyles["error"]
                        : ""
                    }`}
                  >
                    <div
                      onClick={() => onFocusField("firstName")}
                      onBlur={onBlurField}
                      className={formStyles["input-field-container-name"]}
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
                  {values[FormKeys.FirstName].error && (
                    <div className={formStyles["error-message"]}>
                      {values[FormKeys.FirstName].error}
                    </div>
                  )}
                </div>
                <div className={`${styles["field-box-smaller"]}`}>
                  <div
                    className={`${formStyles["filed-container"]} ${
                      values[FormKeys.LastName].error ? formStyles["error"] : ""
                    }`}
                  >
                    <div
                      onClick={() => onFocusField("lastName")}
                      onBlur={onBlurField}
                      className={formStyles["input-field-container-name"]}
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
                  {values[FormKeys.LastName].error && (
                    <div className={formStyles["error-message"]}>
                      {values[FormKeys.LastName].error}
                    </div>
                  )}
                </div>
                <div className={`${styles["field-box"]}`}>
                  <div
                    className={`${formStyles["filed-container"]} ${
                      values[FormKeys.PhoneNumber].error
                        ? formStyles["error"]
                        : ""
                    }`}
                  >
                    <div
                      onClick={() => onFocusField("phoneNumber")}
                      onBlur={onBlurField}
                      className={formStyles["input-field-container-details"]}
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
                  {values[FormKeys.PhoneNumber].error && (
                    <div className={formStyles["error-message"]}>
                      {values[FormKeys.PhoneNumber].error}
                    </div>
                  )}
                </div>
                <div className={`${styles["field-box-smaller"]}`}>
                  <div
                    className={`${formStyles["filed-container"]} ${
                      values[FormKeys.Country].error ? formStyles["error"] : ""
                    }`}
                  >
                    <div
                      onClick={() => onFocusField("country")}
                      onBlur={onBlurField}
                      className={formStyles["input-field-container-name"]}
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
                  {values[FormKeys.Country].error && (
                    <div className={formStyles["error-message"]}>
                      {values[FormKeys.Country].error}
                    </div>
                  )}
                </div>
                <div className={`${styles["field-box-smaller"]}`}>
                  <div
                    className={`${formStyles["filed-container"]} ${
                      values[FormKeys.City].error ? formStyles["error"] : ""
                    }`}
                  >
                    <div
                      onClick={() => onFocusField("city")}
                      onBlur={onBlurField}
                      className={formStyles["input-field-container-name"]}
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
                  {values[FormKeys.City].error && (
                    <div className={formStyles["error-message"]}>
                      {values[FormKeys.City].error}
                    </div>
                  )}
                </div>
                <div className={`${styles["field-box"]}`}>
                  <div
                    className={`${formStyles["filed-container"]} ${
                      values[FormKeys.Address].error ? formStyles["error"] : ""
                    }`}
                  >
                    <div
                      onClick={() => onFocusField("address")}
                      onBlur={onBlurField}
                      className={formStyles["input-field-container-details"]}
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
                  {values[FormKeys.Address].error && (
                    <div className={formStyles["error-message"]}>
                      {values[FormKeys.Address].error}
                    </div>
                  )}
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
                      onClick={() => onCloseUpdateAddressBook()}
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
