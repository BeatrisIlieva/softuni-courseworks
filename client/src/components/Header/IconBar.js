import styles from "./IconBar.module.css";
import { Link } from "react-router-dom";

export const IconBar = () => {
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
        <li>
          <Link className={styles["icon-bar-item"]} to="/">
            <i class="far fa-heart"></i>
          </Link>
        </li>
        <li>
          <Link className={styles["icon-bar-item"]} to="/">
            <i class="fas fa-shopping-bag"></i>
          </Link>
        </li>
        <li>
          <Link className={styles["icon-bar-item"]} to="/:users/login">
            <i class="far fa-user"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};
