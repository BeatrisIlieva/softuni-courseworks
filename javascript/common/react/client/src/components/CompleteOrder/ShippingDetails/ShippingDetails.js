import formStyles from "../../../commonCSS/Form.module.css";
import buttonStyles from "../../../commonCSS/Button.module.css";
import styles from "./ShippingDetails.module.css";
import { useFormAddressBook } from "../../../hooks/useFormAddressBook";

const FormKeys = {
  FirstName: "firstName",
  LastName: "lastName",
  PhoneNumber: "phoneNumber",
  Country: "country",
  City: "city",
  Address: "address",
};

export const ShippingDetails = ({ onContinueCheckoutSubmit }) => {
  const { values, changeHandler, onFocusField, onBlurField } =
    useFormAddressBook(
      {
        [FormKeys.FirstName]: { value: "", focusField: false },
        [FormKeys.LastName]: { value: "", focusField: false },
        [FormKeys.PhoneNumber]: { value: "", focusField: false },
        [FormKeys.Country]: { value: "", focusField: false },
        [FormKeys.City]: { value: "", focusField: false },
        [FormKeys.Address]: { value: "", focusField: false },
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

    onContinueCheckoutSubmit(data);
  };

  return (
    <section id={styles["shipping-details-box"]}>
      {values && (
        <div className={styles["modal-dialog"]}>
          <div className={styles["modal-content"]}>
            <div className={styles["modal-header"]}>
              <h2 className={styles["title"]}>Add Address</h2>
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
                <div className={`${formStyles["filed-container"]}`}>
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
                <div
                  className={`${formStyles["filed-container"]} ${styles["input-container-left"]}`}
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
                <div
                  className={`${formStyles["filed-container"]} ${styles["input-container-left"]}`}
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
                <div
                  className={`${formStyles["filed-container"]} ${styles["input-container-left"]}`}
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
                <div
                  className={`${formStyles["filed-container"]} ${styles["input-container-left"]}`}
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
                <div className={styles["center"]}>
                  <div>
                    <input
                      className={`${buttonStyles["button"]} ${buttonStyles["save"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
                      type="submit"
                      value="Continue Checkout"
                    />
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
