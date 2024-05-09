import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { NavBar } from "./NavBar";
import { IconBar } from "./IconBar";

export const Header = () => {
  return (
    <header className={styles["header"]}>
      <Link to="/">
        <div className={styles["logo-img-container"]}>
        <img className={styles["logo-img"]} src={"https://res.cloudinary.com/deztgvefu/image/upload/v1714938711/template_images/Untitled_design_t0jumi.png"} alt={"Logo"} />
        </div>
      </Link>
      <NavBar />
      <IconBar/>
    </header>
  );
};
