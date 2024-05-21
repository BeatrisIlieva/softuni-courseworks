import styles from "./MiniBag.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import buttonStyles from "../../../commonCSS/Button.module.css";
import { MiniBagTemplate } from "./MiniBagTemplate";
import { useBagContext } from "../../../contexts/BagContext";
import { Link } from "react-router-dom";

export const MiniBag = ({ onClose }) => {
  const { user, bagItems, totalPrice, totalQuantity } = useBagContext();

  const isVisible = true;

  return (
    <section id={styles["mini-bag"]}>
      <div
        className={`${styles["mini-bag-shadow"]} ${
          isVisible ? styles.active : ""
        }`}
      ></div>
      {/* <div className={styles["mini-bag-shadow"]}></div> */}
      <div className={styles["mini-bag-dialog"]}>
        <div className={styles["modal-dialog"]}>
          <div className={styles["modal-content"]}>
            <div className={styles["modal-header"]}>
              {/* onClick={() => onCloseAddressBook()} */}
              <h2 className={styles["popup-title"]}>
                Your Bag
                <span className={styles["popup-items"]}>
                  {totalQuantity} {totalQuantity > 1 ? "items" : "item"}
                </span>
              </h2>
              <div id={styles["xMark"]} onClick={onClose}>
                <FontAwesomeIcon icon={faXmark} className={styles["x-mark"]} />
              </div>
            </div>
            <hr className={styles["horizontal-line"]} />
            <div className={styles["modal-body"]}>
              <p className={styles["popup-delivery"]}>Delivery</p>
              <ul className={styles["popup-jewelry-container"]} role="list">
                {bagItems.map((item) => (
                  <li
                    key={item._id}
                    className={styles["popup-jewelry-sub-container"]}
                  >
                    <MiniBagTemplate
                      {...item}
                      // onRemove={onRemove}
                      // onDecrement={onDecrement}
                      // onQuantityChange={onQuantityChange}
                      // onBlur={onBlur}
                      // onIncrement={onIncrement}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <hr className={styles["horizontal-line"]} />
            <div className={styles["bag-popup-checkout-container"]}>
              <div className={styles["bag-popup-total"]}>
                <p className={styles["bag-right-sub-container-bold"]}>Total</p>
                <p
                  className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-bold"]}`}
                >
                  ${totalPrice}
                </p>
              </div>
              <div className={styles["continue-checkout-button-container"]}>
                <input
                  className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]} ${styles["view-bag-button"]}`}
                  type="submit"
                  value="View Bag"
                />
              </div>
              <div className={styles["continue-checkout-button-container"]}>
                <Link to={`/complete-order/${user}`}>
                  <input
                    className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]} ${styles["continue-checkout-button"]}`}
                    type="submit"
                    value="Continue Checkout"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
