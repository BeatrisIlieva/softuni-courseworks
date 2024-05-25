import { JewelryListTemplate } from "../../JewelryList/JewelryListTemplate"
import styles from "../../JewelryList/JewelryList.module.css"
import { useState, useEffect } from "react";
import { useService } from "../../../hooks/useService";
import { searchServiceFactory } from "../../../services/searchService";
import { useLocation } from "react-router-dom";

export const  SearchResult = () => {
  const searchService = useService(searchServiceFactory);

  const location = useLocation();
  const [query, setQuery] = useState(location.state?.query || []);
  const [jewelries, setJewelries] = useState([]);

    useEffect(() => {
      searchService
      .display(query)
      .then(setJewelries)
      .catch((err) => {
        console.log(err.message);
      });
  }, [query]);


    const handleMouseEnter = (_id) => {
        setJewelries((state) =>
          state.map((j) =>
            j._id === _id ? { ...j, isHovered: true } : { ...j, isHovered: false }
          )
        );
      };
    
      const handleMouseLeave = (_id) => {
        setJewelries((state) =>
          state.map((j) => (j._id === _id ? { ...j, isHovered: false } : j))
        );
      };
return (
    <>
    <section className={styles["jewelry-cards"]}>
    {jewelries.map((j) => (
      <JewelryListTemplate
        key={j._id}
        {...j}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    ))}
  </section>
</>
)
}