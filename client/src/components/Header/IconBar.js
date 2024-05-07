import styles from "./IconBar.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const IconBar = () => {
  const { isAuthenticated, userEmail, userId } = useContext(AuthContext);

  return (
    <div className={styles["icon-bar"]}>
      <ul className={styles["icon-bar-list"]}>
        <li>
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
        </li>
        {/* {isAuthenticated && ( */}
          <li>
            <Link className={styles["icon-bar-item"]} to="/">
              <i class="far fa-heart"></i>
            </Link>
          </li>
        {/* )} */}
        {/* {!isAuthenticated && ( */}
          <li>
            <Link className={styles["icon-bar-item"]} to="/">
              <i class="far fa-heart"></i>
            </Link>
          </li>
        {/* )} */}
        {/* {isAuthenticated && ( */}
          <li>
            {/* <Link className={styles["icon-bar-item"]} to="/bag/:userId"> */}
            <Link className={styles["icon-bar-item"]} to={`/bag/display/${userId}`}>
              <i class="fas fa-shopping-bag"></i>
            </Link>
          </li>
        {/* )} */}
        {/* {!isAuthenticated && ( */}
          <li>
            <Link className={styles["icon-bar-item"]} to="/users/login">
              <i class="far fa-user"></i>
            </Link>
          </li>
        {/* )} */}
        {/* {isAuthenticated && ( */}
          <li>
            <Link className={styles["icon-bar-item"]} to="/users/details">
              <i class="far fa-user"></i>
            </Link>
          </li>
        {/* )} */}
        {/* {isAuthenticated && (
          <li>
            <Link className={styles["icon-bar-item"]} to="/users/logout">
            <i class="fas fa-sign-out-alt"></i>
            </Link>
          </li>
        )} */}
      </ul>
    </div>
  );
};
