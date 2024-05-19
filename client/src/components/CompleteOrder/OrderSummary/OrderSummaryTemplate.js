import styles from "./OrderSummary.module.css";

export const OrderSummaryTemplate = ({
  firstImageUrl,
  jewelryTitle,
  categoryTitle,
  sizeTitle,
  totalPrice,
  size,
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
        <span className={styles["popup-composition-size"]}>
          Size: {sizeTitle ? sizeTitle : `${size.$numberDecimal} cm.`}
        </span>
      </div>
      <div className={styles["popup-bag-price-quantity"]}>
        <h4 className={styles["popup-bag-price"]}>${totalPrice}</h4>
        <div className={styles["popup-bag-quantity"]}>
        </div>
      </div>
    </>
  );
};