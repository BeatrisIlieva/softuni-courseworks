import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useService } from "../../hooks/useService";
import { completeCheckoutServiceFactory } from "../../services/completeCheckoutService";
import { useFormNotAuthUser } from "../../hooks/useFormNotAuthUser";
import formStyles from "../../commonCSS/Form.module.css";
import styles from "../CompleteCheckout/CompleteCheckout.module.css";
import buttonStyles from "../../commonCSS/Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { CardDetailsForm } from "./CardDetailsForm/CardDetailsForm";

export const CompleteCheckout = () => {
  return (
    <section id={styles["complete-order-box"]}>
      <div className={styles["title-container"]}>
        <h2 className={styles["title"]}>Checkout</h2>
        <div className={styles["title-sub-container"]}>
          <h4 className={styles["main-sub-title"]}>Payment</h4>
          <FontAwesomeIcon icon={faChevronRight} className={styles["arrow"]} />
          <h4 className={styles["sub-title"]}>Order Confirmation</h4>
        </div>
      </div>
      <div className={styles["complete-order-container"]}>
        <div className={styles["left-container"]}>
          <div className={styles["left-top-container"]}>
            <h4 className={styles["left-top-container-title"]}>Card Details</h4>
          </div>
          <div>
            <CardDetailsForm />
          </div>
        </div>
        <div className={styles["right-container"]}>
          <div className={styles["right-container-image"]}>
            <img
              className={styles["right-container-img"]}
              src="https://res.cloudinary.com/deztgvefu/image/upload/v1706546636/template_images/MobileWallet_CB2_mobile_shxokh.jpg"
              alt="image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
