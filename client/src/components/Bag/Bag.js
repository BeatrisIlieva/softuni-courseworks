import styles from "./Bag.module.css";
import { bagServiceFactory } from "../../services/bagService";
import { useService } from "../../hooks/useService";
import { useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import buttonStyles from "../../commonCSS/Button.module.css";

export const Bag = () => {
  const bagService = useService(bagServiceFactory);
  const [bagItems, setBagItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { userId } = useContext(AuthContext);

  // useEffect(() => {
  //   bagService
  //     .display(userId)
  //     .then(setBagItems)
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

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

  const onIncrement = (e) => {
    e.preventDefault();

    const currentQuantity = e.target.value;
    const updatedQuantity = currentQuantity - 1;
    const bagItemId = e.target.bagItemId;
    const sizeId = e.target.sizeId;

    // const data = { bagItemId, updatedQuantity, sizeId };
  };

  return (
    <>
      {bagItems && (
        <div className={styles["bag-container"]}>
          <div className={styles["bag-left-container"]}>
            <p className={styles["bag-left-container-title"]}>
              <i class="fas fa-truck"></i> Delivery (0 items)
            </p>
            <div className={styles["bag-left-sub-container"]}>
              {bagItems.map((item) => (
                <div
                  key={item._id}
                  className={styles["bag-left-sub-left-container"]}
                >
                  <div className={styles["jewelry-bag-image"]}>
                    <img
                      className={styles["jewelry-bag-img"]}
                      src={item.firstImageUrl}
                      alt={item.firstImageUrl}
                    />
                  </div>
                  <div className={styles["jewelry-bag-composition"]}>
                    <h2 className={styles["jewelry-bag-composition-title"]}>
                      {item.jewelryTitle} {item.categoryTitle}
                    </h2>
                    <ul role="list">
                      <li className={styles["bag-composition-metal"]}>
                        {item.metalInfo.map((metalItem, index) => (
                          <div key={index}>
                            {metalItem.map((i, index) => (
                              <span
                                key={index}
                                // classNames={styles["bag-composition-metal"]}
                              >
                                {i.caratWeight &&
                                  i.caratWeight.$numberDecimal &&
                                  `${i.caratWeight.$numberDecimal}ct.`}{" "}
                                {i.metal}
                                {index !== item.metalInfo.length - 1 && (
                                  <>
                                    ,<br />
                                  </>
                                )}
                              </span>
                            ))}
                          </div>
                        ))}
                      </li>
                      <li className={styles["bag-composition-stone"]}>
                        {item.stoneInfo.map((stoneItem, index) => (
                          <div key={index}>
                            {stoneItem.map((i, index) => (
                              <span
                                key={index}
                                // classNames={styles["bag-composition-stone"]}
                              >
                                {i.caratWeight &&
                                  i.caratWeight.$numberDecimal &&
                                  `${i.caratWeight.$numberDecimal}ct.`}{" "}
                                {i.stoneColor} {i.stoneType}
                                {index !== item.stoneInfo.length - 1 && (
                                  <>
                                    ,<br />
                                  </>
                                )}
                              </span>
                            ))}
                          </div>
                        ))}
                      </li>
                      <li className={styles["jewelry-bag-composition-size"]}>
                        Size:{" "}
                        {item.sizeTitle
                          ? item.sizeTitle
                          : `${item.size.$numberDecimal} cm.`}
                      </li>
                      <li>
                        {/* <form onSubmit={onSubmit} method="POST">
                      <div className={styles["add-to-bag-button"]}>
                        <input
                          className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
                          type="submit"
                          value="ADD TO BAG"
                        />
                      </div>
                    </form> */}
                      </li>
                    </ul>
                  </div>
                  <div className={styles["jewelry-bag-price-quantity"]}>
                    {/* <div className={styles["jewelry-bag-price"]}> */}
                    <h4 className={styles["jewelry-bag-price"]}>
                      ${item.totalPrice}
                    </h4>
                    {/* </div> */}
                    <div>
                      <button onClick={() => onDecrement(item._id)}>-</button>
                    </div>
                    <form onSubmit={onDecrement}>
                      {/* <button type="submit">-</button> */}
                      <input
                        name="1"
                        min={item.minQuantity}
                        max={item.maxQuantity}
                        type="submit"
                        value="-"
                      />
                    </form>

                    <input
                      name={item._id}
                      min={item.minQuantity}
                      max={item.maxQuantity}
                      type="text"
                      value={Number(item.quantity)}
                      readOnly
                    />

                    <form
                      className="counter-form"
                      onSubmit={onIncrement}
                      method="POST"
                    >
                      <button type="submit">+</button>
                      <input
                        name={item._id}
                        min={item.minQuantity}
                        max={item.maxQuantity}
                        type="hidden"
                        value={1}
                      />
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles["bag-right-container"]}>
            <div className={styles["bag-right-container-sticky"]}>
              <p className={styles["bag-right-container-title"]}>
                Order Summary
              </p>
              <div className={styles["bag-right-sub-container"]}>
                <div className={styles["bag-right-sub-right-container"]}>
                  <p className={styles["bag-right-sub-container-bold"]}>
                    Subtotal
                  </p>
                  <p
                    className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-bold"]}`}
                  >
                    ${totalPrice}
                  </p>
                </div>
                <div className={styles["bag-right-sub-right-container"]}>
                  <p>Shipping</p>
                  <p
                    className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-not-bold"]}`}
                  >
                    Complimentary
                  </p>
                </div>
                <hr className={styles["horizontal-line"]} />
                <div className={styles["bag-right-sub-right-container"]}>
                  <p className={styles["bag-right-sub-container-bold"]}>
                    Total
                  </p>
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
        </div>
      )}
    </>
  );
};
