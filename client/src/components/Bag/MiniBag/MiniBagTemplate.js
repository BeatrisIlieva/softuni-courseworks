import styles from "./MiniBag.module.css";
import { useBagContext } from "../../../contexts/BagContext";

export const MiniBagTemplate = ({
  _id,
  firstImageUrl,
  jewelryTitle,
  categoryTitle,
  sizeTitle,
  totalPrice,
  minQuantity,
  maxQuantity,
  quantity,
  size,
}) => {
  const { onDecrement, onIncrement, onRemove, onQuantityChange, onBlur } =
    useBagContext();
  return (
    <>
      <div className={styles["jewelry-popup-image"]}>
        <img
          className={styles["jewelry-popup-img"]}
          src={firstImageUrl}
          alt={firstImageUrl}
        />
      </div>
      <div className={styles["popup-container-open"]}>
        <h2 className={styles["jewelry-popup-composition-title"]}>
          {jewelryTitle} {categoryTitle}
        </h2>
        <span className={styles["popup-composition-size"]}>
          Size: {sizeTitle ? sizeTitle : `${size.$numberDecimal} cm.`}
        </span>
        <div className={styles["popup-composition-button-container"]}>
          <button
            className={styles["popup-bag-composition-button"]}
            onClick={() => onRemove(_id)}
          >
            Remove
          </button>
        </div>
      </div>
      <div className={styles["popup-bag-price-quantity"]}>
        <h4 className={styles["popup-bag-price"]}>${totalPrice}</h4>
        <div className={styles["popup-bag-quantity"]}>
          <div>
            <button
              className={styles["popup-bag-quantity-button"]}
              onClick={() => onDecrement(_id)}
            >
              <i class="fas fa-minus"></i>
            </button>
          </div>
          <div className={styles["popup-bag-quantity-input"]}>
            <input
              name={_id}
              min={minQuantity}
              max={maxQuantity}
              type="text"
              value={quantity}
              onChange={(e) => onQuantityChange(e, _id)}
              onBlur={() => onBlur(_id, quantity)}
            />
          </div>
          <div>
            <button
              className={styles["popup-bag-quantity-button"]}
              onClick={() => onIncrement(_id)}
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
