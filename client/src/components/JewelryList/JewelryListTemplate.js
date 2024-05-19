import styles from "./JewelryListTemplate.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { WishListContext } from "../../contexts/WishListContext";

export const JewelryListTemplate = ({
  _id,
  firstImageUrl,
  jewelryTitle,
  categoryId,
  categoryTitle,
  price,
  isLikedByUser,
  isSoldOut,
  isHovered,
  handleMouseEnter,
  handleMouseLeave,
  handleLikedByUser,
}) => {
  const { onAddToWishListClick, onRemoveFromWishListClick, wishlist } =
    useContext(WishListContext);

    const jewelryIsLikedByNotAuthUser = wishlist.find(id => id === _id);

    if (jewelryIsLikedByNotAuthUser) {
      isLikedByUser = true;
    }

  return (
    <article className={styles["jewelry-card"]}>
      {!isSoldOut && (
        <div className={styles["jewelry-card-thumbnail"]}>
          {isLikedByUser === true ? (
            <FontAwesomeIcon
              icon={solidHeart}
              className={`${styles["heart"]}`}
              onClick={() => {
                handleLikedByUser(_id);
                onRemoveFromWishListClick(_id);
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={regularHeart}
              className={`${styles["heart"]}`}
              onClick={() => {
                onAddToWishListClick(_id);
                handleLikedByUser();
              }}
            />
          )}
          <Link to={`/${categoryId}/${_id}`}>
            <img
              className={styles["jewelry-card-img"]}
              src={firstImageUrl}
              alt={jewelryTitle}
              onMouseEnter={() => handleMouseEnter(_id)}
              onMouseLeave={() => handleMouseLeave(_id)}
              onBlur={() => handleMouseEnter(_id)}
            />
            {isHovered && (
              <div className={styles["hovered"]}>
                <div className={styles["hovered-content"]}>
                  <p className={styles["hovered-content-left"]}>
                    {jewelryTitle}
                  </p>{" "}
                  <p className={styles["hovered-content-right"]}>
                    {categoryTitle}
                  </p>
                </div>
                <div className={styles["hovered-content-down"]}>
                  <FontAwesomeIcon icon={faSackDollar} className={styles["dollar-icon"]}/>
                  <p className={styles["dollar-icon"]}>{price}</p>
                </div>
              </div>
            )}
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
