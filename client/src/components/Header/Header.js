import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { NavBar } from "./NavBar";
import { IconBar } from "./IconBar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
  const { isAuthenticated, userEmail, userId } = useContext(AuthContext);
  return (
    <header className={styles["header"]}>
      <div className={styles["header-box"]}>
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
            <span className={styles["icon-search"]}>
              <i class="fas fa-search"></i>
            </span>
            <input
              type="text"
              placeholder="  Find a jewelry"
              className={styles["search-input"]}
            />
          </div>
          {/* </Link> */}
        </div>
        <div className={styles["icon-box"]}>
          <div className={styles["icon-bar"]}>
            <ul className={styles["icon-bar-list"]}>
              {/* {isAuthenticated && ( */}
              <li>
                <Link className={`${styles["icon-bar-item"]} ${styles["icon-bar-item-no-margin"]}`} to="/">
                  <i class="far fa-heart"></i>
                </Link>
              </li>
              {/* )} */}
              {/* {isAuthenticated && ( */}
              <li>
                {/* <Link className={styles["icon-bar-item"]} to="/bag/:userId"> */}
                <Link className={styles["icon-bar-item"]} to={`/user/bag`}>
                  <i class="fas fa-shopping-bag"></i>
                </Link>
              </li>
              {/* )} */}
              {!isAuthenticated && (
                <li>
                  <Link className={styles["icon-bar-item"]} to="/user/login">
                    <i class="far fa-user"></i>
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <Link className={styles["icon-bar-item"]} to="/user/details">
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
    </header>
  );
};
