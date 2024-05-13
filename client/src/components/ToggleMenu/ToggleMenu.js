import { useState } from "react";
import formStyles from "../../commonCSS/Form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import styles from "../ToggleMenu/ToggleMenu.module.css";

export const ToggleMenu = ({ options, title, subtitle }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleMenuItemClick = (action) => {
    console.log("Menu item clicked:", action);
    setMenuOpen(false);
  };

  return (
    <div>
      <div onClick={toggleMenu} className={styles["menu"]}>
        <h3 className={`${formStyles["title"]}`}>
          {isMenuOpen ? (
            <>
              {title}
              <span className={styles["arrow"]}>
                <FontAwesomeIcon icon={faAngleUp} />
              </span>
            </>
          ) : (
            <>
              {title}
              <span className={styles["arrow"]}>
                <FontAwesomeIcon icon={faAngleDown} />
              </span>
            </>
          )}
        </h3>
      </div>
      {isMenuOpen && (
        <>
          <p className={formStyles["sub-title"]}>{subtitle}</p>
          <ul
            role="list"
            className={`${formStyles["form-list"]} ${styles["slideIn"]}`}
          >
            {options.map((option, index) => (
              <li
                className={formStyles["form-item-list"]}
                key={index}
                onClick={() => handleMenuItemClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
