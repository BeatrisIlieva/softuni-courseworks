import styles from "./JewelryListTemplate.module.css";
import { Link } from "react-router-dom";

export const JewelryListTemplate = ({
  _id,
  firstImageUrl,
  jewelryTitle,
  categoryId,
  isSoldOut,
  isHovered,
  handleMouseEnter,
}) => {
  return (
    <article className={styles["jewelry-card"]}>
      {!isSoldOut && (
        <div className={styles["jewelry-card-thumbnail"]}>
          <Link to={`/${categoryId}/${_id}`}>
            <img
              className={styles["jewelry-card-img"]}
              src={firstImageUrl}
              alt={jewelryTitle}
              onMouseEnter={() => handleMouseEnter(_id)}
            />
            {isHovered && <p>is hovered</p>}
          </Link>
        </div>
      )}
      {isSoldOut && (
        <div className={styles["jewelry-card-thumbnail-sold-out"]}>
          <img
            className={styles["jewelry-card-img-sold-out"]}
            src={firstImageUrl}
            alt={jewelryTitle}
          />
          <span className={styles["sold-out"]}>SOLD OUT</span>
        </div>
      )}
    </article>
  );
};
