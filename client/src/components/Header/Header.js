import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import colorStyles from "../../commonCSS/Colors.module.css";
import { useWishListContext } from "../../contexts/WishListContext";
import { useBagContext } from "../../contexts/BagContext";

export const Header = () => {
  const { isAuthenticated, userId } = useContext(AuthContext);
  const { wishlistCount, wishListCountGreaterThanZero } = useWishListContext();
  const { user, totalQuantity, isEmpty} = useBagContext();


  return (
    <header className={styles["header"]}>
      <div className={styles["header-box"]}>
        <div className={styles["header-container"]}>
          <div className={styles["logo-box"]}>
            <div className={styles["logo-box"]}>
              <Link to="/">
                <div className={styles["logo-img-container"]}>
                  <img
                    className={styles["logo-img"]}
                    src={
                      "https://res.cloudinary.com/deztgvefu/image/upload/v1714938711/template_images/Untitled_design_t0jumi.png"
                    }
                    alt={"Logo"}
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className={styles["nav-box"]}>
            <nav className={styles["navigation"]}>
              <ul className={styles["nav-list"]} role="list">
                <li>
                  <Link className={styles["nav-item"]} to="/2">
                    Earrings
                  </Link>
                </li>
                <li>
                  <Link className={styles["nav-item"]} to="/3">
                    Necklaces
                  </Link>
                </li>
                <li>
                  <Link className={styles["nav-item"]} to="/1">
                    Bracelets
                  </Link>
                </li>
                <li>
                  <Link className={styles["nav-item"]} to="/4">
                    Rings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles["search-box"]}>
            {/* <Link className={styles["icon-bar-item"]} to="/"> */}
            <div className={styles["search-container"]}>
              <span>
                <FontAwesomeIcon
                  icon={faSearch}
                  className={`${colorStyles["dark-pink"]} ${styles["icon-search"]}`}
                />
              </span>
              <input
                type="text"
                className={styles["search-input"]}
                placeholder="Find a jewelry"
              />
            </div>
            {/* </Link> */}
          </div>
          <div className={styles["icon-box"]}>
            <div className={styles["icon-bar"]}>
              <ul className={styles["icon-bar-list"]} role="list">
                <li className={styles["icon-bar-list-flex"]}>
                  <Link
                    className={`${styles["icon-bar-item"]} ${styles["icon-bar-item-no-margin"]}`}
                    to={`/wishlist`}
                  >
                    <i class="far fa-heart"></i>{" "}
                    {wishListCountGreaterThanZero ? (
                      <span className={styles["icon-bar-count"]}>
                        ({wishlistCount})
                      </span>
                    ) : (
                      <span className={styles["icon-bar-count"]} />
                    )}
                  </Link>
                </li>
                <li>
                  <Link className={styles["icon-bar-item"]} to={`/bag/display/${user}`}>
                    <i class="fas fa-shopping-bag"></i>{" "}
                    {!isEmpty && (
                      <span className={styles["icon-bar-count"]}>
                        ({totalQuantity})
                      </span>
                    )}
                  </Link>
                </li>
                {!isAuthenticated && (
                  <li>
                    <Link className={styles["icon-bar-item"]} to="/user/login">
                      <i class="far fa-user"></i>
                    </Link>
                  </li>
                )}
                {isAuthenticated && (
                  <li>
                    <Link
                      className={styles["icon-bar-item"]}
                      to="/user/details"
                    >
                      <i class="far fa-user"></i>
                    </Link>
                  </li>
                )}
                {/* {isAuthenticated && (
          <li>
            <Link className={styles["icon-bar-item"]} to="/users/logout">
            <i class="fas fa-sign-out-alt"></i>
            </Link>
          </li>
        )} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
