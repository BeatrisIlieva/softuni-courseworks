import formStyles from "../../../commonCSS/Form.module.css";
import buttonStyles from "../../../commonCSS/Button.module.css";
import styles from "../../CompleteOrder/ShippingDetails/ShippingDetails.module.css";
import { useFormNotAuthUser } from "../../../hooks/useFormNotAuthUser";
import { completeCheckoutServiceFactory } from "../../../services/completeCheckoutService";
import { useNavigate } from "react-router-dom";
import { useService } from "../../../hooks/useService";
import { useAuthContext } from "../../../contexts/AuthContext";
import { validateLongCardNumber, validateExpirationDate, validateCVVCode } from "./CardDetailsFormValidators";

const FormKeys = {
  LongCardNumber: "longCardNumber",
  ExpirationDate: "expirationDate",
  CvvCode: "cvvCode",
};

function isCardExpired(expirationDate) {
  const [month, year] = expirationDate
    .split("/")
    .map((val) => parseInt(val, 10));
  const expiration = new Date("20" + year + "-" + month + "-01");

  const currentDate = new Date();

  if (expiration < currentDate) {
    return true;
  } else {
    return false;
  }
}

export const CardDetailsForm = () => {
  const { userId } = useAuthContext();
  const completeCheckoutService = useService(completeCheckoutServiceFactory);
  const navigate = useNavigate();

  const onConfirmCheckoutSubmit = async (values) => {
    const longCardNumber = values.longCardNumber.value;
    const expirationDate = values.expirationDate.value;
    const cvvCode = values.cvvCode.value;
    const data = { longCardNumber, expirationDate, cvvCode };

    try {
      values[FormKeys.LongCardNumber].error = validateLongCardNumber(
        values[FormKeys.LongCardNumber].value
      );

      values[FormKeys.ExpirationDate].error = validateExpirationDate(
        values[FormKeys.ExpirationDate].value
      );

      values[FormKeys.CvvCode].error = validateCVVCode(
        values[FormKeys.CvvCode].value
      );

      // if (!/^\d{16}$/.test(values[FormKeys.LongCardNumber].value)) {
      //   values[FormKeys.LongCardNumber].error =
      //     "The card number should be exactly 16 digits long.";
      // } else {
      //   values[FormKeys.LongCardNumber].error = null;
      // }
      // if (!/^\d{2}\/\d{2}$/.test(values[FormKeys.ExpirationDate].value)) {
      //   values[FormKeys.ExpirationDate].error =
      //     "The expiration date should be in the format MM/YY.";
      // }
      // if (isCardExpired(expirationDate)) {
      //   values[FormKeys.ExpirationDate].error = "This card has expired.";
      // }
      // if (!/^\d{3}$/.test(values[FormKeys.CvvCode].value)) {
      //   values[FormKeys.CvvCode].error =
      //     "The CVV code should be exactly 3 digits long.";
      // }
      if (
        values[FormKeys.LongCardNumber].error === null &&
        values[FormKeys.ExpirationDate].error === null &&
        values[FormKeys.CvvCode].error === null
      ) {
        await completeCheckoutService.confirm(userId, data);
        navigate(`/order-confirmation/${userId}`);
      }
    } catch (err) {
      console.log(err);
      // if (!/^\d{16}$/.test(values[FormKeys.LongCardNumber].value)) {
      //   values[FormKeys.LongCardNumber].error =
      //     "The card number should be exactly 16 digits long.";
      // }
      // if (!/^\d{2}\/\d{2}$/.test(values[FormKeys.ExpirationDate].value)) {
      //   values[FormKeys.ExpirationDate].error =
      //     "The expiration date should be in the format MM/YY.";
      // }
      // if (!/^\d{3}$/.test(values[FormKeys.CvvCode].value)) {
      //   values[FormKeys.CvvCode].error =
      //     "The CVV code should be exactly 3 digits long.";
      // }
    }

    const currentValues = { ...values };

    setValues(currentValues);
  };

  const {
    values,
    changeHandler,
    onFocusField,
    onBlurField,
    onSubmit,
    setValues,
  } = useFormNotAuthUser(
    {
      [FormKeys.LongCardNumber]: { value: "", focusField: false, error: null },
      [FormKeys.ExpirationDate]: { value: "", focusField: false, error: null },
      [FormKeys.CvvCode]: { value: "", focusField: false, error: null },
    },

    onConfirmCheckoutSubmit
  );

  return (
    <section id={styles["shipping-details-box"]}>
      {values && (
        <div className={styles["modal-dialog"]}>
          <div className={styles["modal-content"]}>
            <div className={styles["modal-body"]}>
              <form
                method="POST"
                onSubmit={onSubmit}
                className={styles["address-book-box"]}
              >
                <div className={`${formStyles["filed-box"]}`}>
                  <div
                    className={`${formStyles["filed-container"]} ${
                      values[FormKeys.LongCardNumber].error
                        ? formStyles["error"]
                        : ""
                    }`}
                  >
                    <div
                      onClick={() => onFocusField("longCardNumber")}
                      onBlur={onBlurField}
                      className={formStyles["input-field-container-card"]}
                    >
                      <p
                        className={
                          values[FormKeys.LongCardNumber]["focusField"]
                            ? formStyles["placeholder-on-blur"]
                            : formStyles["placeholder"]
                        }
                      >
                        Enter Valid Card Number*
                      </p>
                      {values[FormKeys.LongCardNumber]["focusField"] && (
                        <input
                          className={formStyles["input-spot"]}
                          type="text"
                          name={FormKeys.LongCardNumber}
                          id="longCardNumber"
                          value={values[FormKeys.LongCardNumber].value}
                          onChange={(e) =>
                            changeHandler(
                              FormKeys.LongCardNumber,
                              e.target.value
                            )
                          }
                          autoFocus
                        />
                      )}
                    </div>
                  </div>
                  {/* <div className={`${formStyles["error-message"]} ${values[FormKeys.LongCardNumber].error ? formStyles["visible"] : ""}`}>{values[FormKeys.LongCardNumber].error}</div> */}
                  {values[FormKeys.LongCardNumber].error && (
                    <div className={formStyles["error-message"]}>
                      {values[FormKeys.LongCardNumber].error}
                    </div>
                  )}
                </div>
                <div className={`${formStyles["filed-box"]}`}>
                  <div
                    className={`${formStyles["filed-container"]} ${
                      values[FormKeys.ExpirationDate].error
                        ? formStyles["error"]
                        : ""
                    }`}
                  >
                    <div
                      onClick={() => onFocusField("expirationDate")}
                      onBlur={onBlurField}
                      className={formStyles["input-field-container-card"]}
                    >
                      <p
                        className={
                          values[FormKeys.ExpirationDate]["focusField"]
                            ? formStyles["placeholder-on-blur"]
                            : formStyles["placeholder"]
                        }
                      >
                        Enter Expiration Date*
                      </p>
                      {values[FormKeys.ExpirationDate]["focusField"] && (
                        <input
                          className={formStyles["input-spot"]}
                          type="text"
                          name={FormKeys.ExpirationDate}
                          id="expirationDate"
                          value={values[FormKeys.ExpirationDate].value}
                          onChange={(e) =>
                            changeHandler(
                              FormKeys.ExpirationDate,
                              e.target.value
                            )
                          }
                          autoFocus
                        />
                      )}
                    </div>
                  </div>
                  {values[FormKeys.ExpirationDate].error && (
                    <div className={formStyles["error-message"]}>
                      {values[FormKeys.ExpirationDate].error}
                    </div>
                  )}
                </div>
                <div className={`${formStyles["filed-box"]}`}>
                  <div
                    className={`${formStyles["filed-container"]} ${
                      values[FormKeys.CvvCode].error ? formStyles["error"] : ""
                    }`}
                  >
                    <div
                      onClick={() => onFocusField("cvvCode")}
                      onBlur={onBlurField}
                      className={formStyles["input-field-container-card"]}
                    >
                      <p
                        className={
                          values[FormKeys.CvvCode]["focusField"]
                            ? formStyles["placeholder-on-blur"]
                            : formStyles["placeholder"]
                        }
                      >
                        Enter CVV Code*
                      </p>
                      {values[FormKeys.CvvCode]["focusField"] && (
                        <input
                          className={formStyles["input-spot"]}
                          type="text"
                          name={FormKeys.CvvCode}
                          id="cvvCode"
                          value={values[FormKeys.CvvCode].value}
                          onChange={(e) =>
                            changeHandler(FormKeys.CvvCode, e.target.value)
                          }
                          autoFocus
                        />
                      )}
                    </div>
                  </div>
                  {values[FormKeys.CvvCode].error && (
                    <div className={formStyles["error-message"]}>
                      {values[FormKeys.CvvCode].error}
                    </div>
                  )}
                </div>
                <div className={styles["center"]}>
                  <div>
                    <input
                      className={`${buttonStyles["button"]} ${buttonStyles["save"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
                      type="submit"
                      value="Confirm"
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
