import styles from "./JewelryListTemplate.module.css";
import { Link } from "react-router-dom";

export const JewelryListTemplate = ({
  _id,
  firstImageUrl,
  jewelryTitle,
  categoryId,
}) => {
  return (
    <article className={styles["jewelry-card"]}>
      <div className={styles["jewelry-card-thumbnail"]}>
        <Link to={`/${categoryId}/${_id}`}>
          <img
            className={styles["jewelry-card-img"]}
            src={firstImageUrl}
            alt={jewelryTitle}
          />
        </Link>
      </div>
    </article>
  );
};
