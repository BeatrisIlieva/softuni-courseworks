import styles from "./JewelryList.module.css";
import { JewelryListTemplate } from "./JewelryListTemplate";
import { useEffect, useState } from "react";
import * as jewelryService from "../../services/jewelries/jewelryService";
import { useParams } from "react-router-dom";


export const JewelryList = () => {
  const { categoryId } = useParams();

  const [jewelries, setJewelries] = useState([]);

  useEffect(() => {
    jewelryService
      .getAll(categoryId)
      .then(setJewelries)
      .catch((err) => {
        console.log(err.message);
      });
  }, [categoryId]);
  
  return (
    <section className={styles["jewelry-cards"]}>
      {jewelries.map((j) => (
        <JewelryListTemplate key={j._id} {...j} />
      ))}
      </section>
  );
};
