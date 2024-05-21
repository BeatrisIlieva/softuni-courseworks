import styles from "./Bag.module.css";
import { Fragment } from "react";
import { useBagContext } from "../../contexts/BagContext";

export const BagTemplate = ({
  _id,
  firstImageUrl,
  jewelryTitle,
  categoryTitle,
  metalInfo,
  stoneInfo,
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
      <div className={styles["jewelry-bag-image"]}>
        <img
          className={styles["jewelry-bag-img"]}
          src={firstImageUrl}
          alt={firstImageUrl}
        />
      </div>
      <div className={styles["jewelry-bag-composition"]}>
        <h2 className={styles["jewelry-bag-composition-title"]}>
          {jewelryTitle} {categoryTitle}
        </h2>
        <ul role="list">
          {metalInfo.map((metalItem, index) => (
            <Fragment key={`metal_${index}`}>
              {metalItem.map((i, metalIndex) => (
                <li
                  key={`metal_${i.metalId}_${metalIndex}`}
                  className={styles["bag-composition-metal"]}
                >
                  {i.caratWeight &&
                    i.caratWeight.$numberDecimal &&
                    `${i.caratWeight.$numberDecimal}ct.`}{" "}
                  {i.metal}
                  {index !== metalInfo.length - 1 && (
                    <>
                      ,<br />
                    </>
                  )}
                </li>
              ))}
            </Fragment>
          ))}
        </ul>
        <ul role="list">
          {stoneInfo.map((stoneItem, index) => (
            <Fragment key={`stone_${index}`}>
              {stoneItem.map((i, stoneIndex) => (
                <li
                  key={`stone_${i.stoneId}_${stoneIndex}`}
                  className={styles["bag-composition-stone"]}
                >
                  {i.caratWeight &&
                    i.caratWeight.$numberDecimal &&
                    `${i.caratWeight.$numberDecimal}ct.`}{" "}
                  {i.stoneColor} {i.stoneType}
                  {index !== stoneInfo.length - 1 && (
                    <>
                      ,<br />
                    </>
                  )}
                </li>
              ))}
            </Fragment>
          ))}
        </ul>
        <span className={styles["jewelry-bag-composition-size"]}>
          Size: {sizeTitle ? sizeTitle : `${size.$numberDecimal} cm.`}
        </span>
        <div className={styles["jewelry-bag-composition-button-container"]}>
          <button
            className={styles["jewelry-bag-composition-button"]}
            onClick={() => onRemove(_id)}
          >
            Edit
          </button>
          <button
            className={styles["jewelry-bag-composition-button"]}
            onClick={() => onRemove(_id)}
          >
            Move to wishlist
          </button>
          <button
            className={styles["jewelry-bag-composition-button"]}
            onClick={() => onRemove(_id)}
          >
            Remove
          </button>
        </div>
      </div>
      <div className={styles["jewelry-bag-price-quantity"]}>
        <h4 className={styles["jewelry-bag-price"]}>${totalPrice}</h4>
        <div className={styles["jewelry-bag-quantity"]}>
          <div>
            <button
              className={styles["jewelry-bag-quantity-button"]}
              onClick={() => onDecrement(_id)}
            >
              <i class="fas fa-minus"></i>
            </button>
          </div>
          <div className={styles["jewelry-bag-quantity-input"]}>
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
              className={styles["jewelry-bag-quantity-button"]}
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
