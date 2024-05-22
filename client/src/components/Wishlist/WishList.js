import { useWishListContext } from "../../contexts/WishListContext";
import styles from "./Wishlist.module.css";
import { WishListTemplate } from "./WishListTemplate";

export const Wishlist = () => {
  const {
    onAddToWishListClick,
    onRemoveFromWishListClick,
    jewelries,
    wishlistCount,
    wishListCountGreaterThanZero,
    // handleMouseEnter,
    // handleMouseLeave,
    // handleLikedByUser
  } = useWishListContext();


  return (
    <>
      <article className={styles["wish-list-card"]}>
        <img
          className={styles["img-bg"]}
          src="https://res.cloudinary.com/deztgvefu/image/upload/v1706346310/template_images/largeherod_l3_candy23_a_red_xczfkn.webp"
          alt="image"
        />
        <div className={styles["wish-list-content-top"]}>
          {wishListCountGreaterThanZero ? (
            <>
              <h2 className={styles["wish-list-tag"]}>
                Your Wish List ({wishlistCount})
              </h2>
              <p className={styles["wish-list-title"]}>
                Your favorite item(s) are below.
                <br />
                Wishes can come true, especially when you dream.
              </p>
            </>
          ) : (
            <h2>Your Wish List (0)</h2>
          )}
        </div>
        <div className={styles["wish-list-content-bottom"]}>
          <div className={styles["meta-info"]}>
            <div className={styles["designer"]}>
              <img src="https://res.cloudinary.com/deztgvefu/image/upload/v1706426486/template_images/cute-little-pink-cat-watercolor-png_2_kxmwtq.webp" />
            </div>
            <p className={styles["name"]}>Beatris Ilieve</p>
            <p className={styles["email"]}>beatrisilieve@icloud.com</p>
          </div>
        </div>
      </article>

      <section className={styles["jewelry-cards"]}>
        {jewelries.map((j) => (
          <WishListTemplate
            key={j._id}
            {...j}
            // handleMouseEnter={handleMouseEnter}
            // handleLikedByUser={handleLikedByUser}
            // handleMouseLeave={handleMouseLeave}
          />
        ))}
      </section>
    </>
  );
};
