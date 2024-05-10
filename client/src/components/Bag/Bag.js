import styles from "./Bag.module.css";
import colorStyles from "../../commonCSS/Colors.module.css";
import discoverStyles from "../Discover/Discover.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
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
        console.log(bagItems);
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

  const onQuantityChange = (e, item) => {
    const newQuantity =
      e.target.value.trim() === "" ? "" : parseInt(e.target.value);
    item.quantity = newQuantity;
    setBagItems([...bagItems]);
  };

  const onBlur = async (item) => {
    try {
      await bagService.update(item._id, { quantity: item.quantity });

      setBagItems([...bagItems]);

      fetchBagItems();
    } catch (error) {
      console.error("Error updating quantity in the database:", error);
    }
  };

  const isEmpty = bagItems.length < 1;

  return (
    <>
      <h2 className={styles["bag-title"]}>Your Bag</h2>
      {!isEmpty ? (
        <div>
          <div className={styles["bag-container"]}>
            <div className={styles["bag-left-container"]}>
              <p className={styles["bag-left-container-title"]}>
                <span
                  className={styles["bag-left-container-title-with-padding"]}
                >
                  <FontAwesomeIcon
                    icon={faTruck}
                    className={colorStyles["dark-pink"]}
                  />
                </span>
                <span
                  className={styles["bag-left-container-title-with-padding"]}
                >
                  Delivery
                </span>
                <span className={styles["delivery-span"]}>
                  ({totalQuantity} {totalQuantity > 1 ? "items" : "item"})
                </span>
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
                          {item.metalInfo.map((metalItem, metalIndex) => (
                            <div key={`metal_${metalItem.metalId}`}>
                              {metalItem.map((i) => (
                                <span key={`metal_${metalItem.metalId}${metalIndex}`}>
                                  {i.caratWeight &&
                                    i.caratWeight.$numberDecimal &&
                                    `${i.caratWeight.$numberDecimal}ct.`}{" "}
                                  {i.metal}
                                  {metalIndex !== item.metalInfo.length - 1 && (
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
                          {item.stoneInfo.map((stoneItem, stoneIndex) => (
                            <div key={`stone_${stoneItem.stoneId}`}>
                              {stoneItem.map((i) => (
                                <span key={`stone_${stoneItem.stoneId}${stoneIndex}`}>
                                  {i.caratWeight &&
                                    i.caratWeight.$numberDecimal &&
                                    `${i.caratWeight.$numberDecimal}ct.`}{" "}
                                  {i.stoneColor} {i.stoneType}
                                  {stoneIndex !== item.stoneInfo.length - 1 && (
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
                      </ul>
                      <div
                        className={
                          styles["jewelry-bag-composition-button-container"]
                        }
                      >
                        <button
                          className={styles["jewelry-bag-composition-button"]}
                          onClick={() => onRemove(item._id)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles["jewelry-bag-composition-button"]}
                          onClick={() => onRemove(item._id)}
                        >
                          Move to wishlist
                        </button>
                        <button
                          className={styles["jewelry-bag-composition-button"]}
                          onClick={() => onRemove(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className={styles["jewelry-bag-price-quantity"]}>
                      <h4 className={styles["jewelry-bag-price"]}>
                        ${item.totalPrice}
                      </h4>
                      <div className={styles["jewelry-bag-quantity"]}>
                        <div>
                          <button
                            className={styles["jewelry-bag-quantity-button"]}
                            onClick={() => onDecrement(item._id)}
                          >
                            <i class="fas fa-minus"></i>
                          </button>
                        </div>
                        <div className={styles["jewelry-bag-quantity-input"]}>
                          <input
                            name={item._id}
                            min={item.minQuantity}
                            max={item.maxQuantity}
                            type="text"
                            value={item.quantity}
                            onChange={(e) => onQuantityChange(e, item)}
                            onBlur={() => onBlur(item)}
                          />
                        </div>
                        <div>
                          <button
                            className={styles["jewelry-bag-quantity-button"]}
                            onClick={() => onIncrement(item._id)}
                          >
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
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
        </div>
      ) : (
        <>
          <div className={styles["bag-sub-title"]}>
            <h3>Your Shopping Bag is Empty.</h3>
            <p>Explore and add something you love.</p>
          </div>
          <div className={discoverStyles["discover-container"]}>
            <div>
              <button
                className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
                // onClick={() => onRemove(item._id)}
              >
                Discover Earrings
              </button>
              <div className={discoverStyles["discover-image"]}>
                <img
                  className={discoverStyles["discover-img"]}
                  src={
                    "https://res.cloudinary.com/deztgvefu/image/upload/v1715272200/discover/diamond_loop_earrings_diamond_eadprddbllp_e-2_j4ugmv.webp"
                  }
                  alt=""
                />
              </div>
            </div>
            <div>
              <button
                className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
                // onClick={() => onRemove(item._id)}
              >
                Discover Necklaces
              </button>
              <div className={discoverStyles["discover-image"]}>
                <img
                  className={discoverStyles["discover-img"]}
                  src={
                    "https://res.cloudinary.com/deztgvefu/image/upload/v1715272200/discover/sparkling_cluster_necklace_diamond_nkdpclrfspc_e-1_ztc7kf.webp"
                  }
                  alt=""
                />
              </div>
            </div>
            <div>
              <button
                className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
                // onClick={() => onRemove(item._id)}
              >
                Discover Bracelets
              </button>
              <div className={discoverStyles["discover-image"]}>
                <img
                  className={discoverStyles["discover-img"]}
                  src={
                    "https://res.cloudinary.com/deztgvefu/image/upload/v1715272200/discover/sunflower-_bracelet_diamond_brdpnasmsf_e-1_copy_zrzmxp.webp"
                  }
                  alt=""
                />
              </div>
            </div>
            <div>
              <button
                className={`${buttonStyles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
                // onClick={() => onRemove(item._id)}
              >
                Discover Rings
              </button>
              <div className={discoverStyles["discover-image"]}>
                <img
                  className={discoverStyles["discover-img"]}
                  src={
                    "https://res.cloudinary.com/deztgvefu/image/upload/v1715272201/discover/sunflower-_ring_diamond_frdpnalgsf_e-2_pstw37.webp"
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
