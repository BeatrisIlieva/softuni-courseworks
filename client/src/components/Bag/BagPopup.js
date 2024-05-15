import styles from "./BagPopup.module.css";
import colorStyles from "../../commonCSS/Colors.module.css";
import discoverStyles from "../Discover/Discover.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { bagServiceFactory } from "../../services/bagService";
import { useService } from "../../hooks/useService";
import { useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import buttonStyles from "../../commonCSS/Button.module.css";
import { BagPopupTemplate } from "./BagPopupTemplate";

export const BagPopup = () => {
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

  const onDecrement = async (bagId) => {
    await bagService.decrease(bagId);

    fetchBagItems();
  };

  const onIncrement = async (bagId) => {
    await bagService.increase(bagId);

    fetchBagItems();
  };

  const onRemove = async (bagId) => {
    await bagService.remove(bagId);

    fetchBagItems();
  };

  const onQuantityChange = (e, _id) => {
    const newQuantity =
      e.target.value.trim() === "" ? "" : parseInt(e.target.value);

    bagItems = bagItems.map((item) => {
      if (item._id === _id) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    setBagItems([...bagItems]);
  };

  const onBlur = async (_id, quantity) => {
    try {
      await bagService.update(_id, { quantity: quantity });

      setBagItems([...bagItems]);

      fetchBagItems();
    } catch (error) {
      console.error("Error updating quantity in the database:", error);
    }
  };

  return (
    <section
      id={styles["bagPopup"]}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
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
            <div id={styles["xMark"]}>
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
                  <BagPopupTemplate
                    {...item}
                    onRemove={onRemove}
                    onDecrement={onDecrement}
                    onQuantityChange={onQuantityChange}
                    onBlur={onBlur}
                    onIncrement={onIncrement}
                  />
                </li>
              ))}
            </ul>
          </div>
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
                className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]} ${styles["continue-checkout-button"]}`}
                type="submit"
                value="Continue Checkout"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
