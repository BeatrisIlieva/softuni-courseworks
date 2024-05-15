import styles from "./MiniBag.module.css";
import { Fragment } from "react";
import { useState } from "react";

export const MiniBagTemplate = ({
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
  onRemove,
  onDecrement,
  onQuantityChange,
  onBlur,
  onIncrement,
}) => {
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
        {/* <ul role="list">
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
        </ul> */}
        <span className={styles["popup-composition-size"]}>
          Size: {sizeTitle ? sizeTitle : `${size.$numberDecimal} cm.`}
        </span>
        <div className={styles["popup-composition-button-container"]}>
          {/* <button
            className={styles["popup-bag-composition-button"]}
            onClick={() => onRemove(_id)}
          >
            Edit
          </button>
          <button
            className={styles["popup-bag-composition-button"]}
            onClick={() => onRemove(_id)}
          >
            Move to wishlist
          </button> */}
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
