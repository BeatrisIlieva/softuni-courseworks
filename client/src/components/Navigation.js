import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className={styles["navigation"]}>
      <ul className={styles["nav-list"]}>
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
        {/* <li className={styles["list-item"]}>Earrings</li>
        <li className={styles["list-item"]}>Necklaces</li>
        <li className={styles["list-item"]}>Bracelets</li>
        <li className={styles["list-item"]}>Rings</li> */}
      </ul>
    </nav>
  );
};
