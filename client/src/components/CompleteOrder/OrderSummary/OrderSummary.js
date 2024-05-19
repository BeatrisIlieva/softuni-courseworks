import styles from "./OrderSummary.module.css";
import colorStyles from "../../../commonCSS/Colors.module.css";
import discoverStyles from "../../Discover/Discover.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { bagServiceFactory } from "../../../services/bagService";
import { useService } from "../../../hooks/useService";
import { useState, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";
import buttonStyles from "../../../commonCSS/Button.module.css";
import { OrderSummaryTemplate } from "./OrderSummaryTemplate";

export const OrderSummary = ({onClose}) => {
  const bagService = useService(bagServiceFactory);
  let [bagItems, setBagItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    fetchBagItems();
  }, []);

  const fetchBagItems = async () => {
    try {
      let data = await bagService.display(userId);
      data = Array.isArray(data) ? data[0] : data;

      if (data && data.jewelries && data.jewelries.length > 0) {
        const bagData = data.jewelries;
        const bagItems = bagData[0].documents;
        setBagItems(bagItems);

        const totalPrice = bagData[0].totalTotalPrice;
        setTotalPrice(totalPrice);

        const totalQuantity = bagData[0].totalQuantity;
        setTotalQuantity(totalQuantity);
      } else {
        setBagItems([]);
        setTotalPrice(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  return (
    <section id={styles["mini-bag"]}>
      <div className={styles["mini-bag-shadow"]}></div>
      <div className={styles["mini-bag-dialog"]}>
        <div className={styles["modal-dialog"]}>
          <div className={styles["modal-content"]}>
            <div className={styles["modal-header"]}>
              {/* onClick={() => onCloseAddressBook()} */}
              <h2 className={styles["popup-title"]}>
                Order Summary
                <span className={styles["popup-items"]}>
                  {totalQuantity} {totalQuantity > 1 ? "items" : "item"}
                </span>
              </h2>
            </div>
            <hr className={styles["horizontal-line"]} />
            <div className={styles["modal-body"]}>
              <ul className={styles["popup-jewelry-container"]} role="list">
                {bagItems.map((item) => (
                  <li
                    key={item._id}
                    className={styles["popup-jewelry-sub-container"]}
                  >
                    <OrderSummaryTemplate
                      {...item}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};