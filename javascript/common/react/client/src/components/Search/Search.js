import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import colorStyles from "../../commonCSS/Colors.module.css";
import styles from "./Search.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    navigate("/search", { state: { query: query } });
  };

  return (
    <>
      <div className={styles["search-box"]}>
        <div className={styles["search-container"]}>
          <span>
            <FontAwesomeIcon
              icon={faSearch}
              className={`${colorStyles["dark-pink"]} ${styles["icon-search"]}`}
            />
          </span>
          <form method="GET" onSubmit={onSubmit}>
            <input
              value={query}
              onChange={onChange}
              type="text"
              className={styles["search-input"]}
              placeholder="Find a jewelry"
            />
          </form>
        </div>
      </div>
    </>
  );
};
