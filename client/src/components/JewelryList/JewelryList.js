import styles from "./JewelryList.module.css";
import { JewelryListTemplate } from "./JewelryListTemplate";
import { useEffect, useState } from "react";
// import * as jewelryService from "../../services/jewelries/jewelryService";
import{jewelryServiceFactory} from "../../services/jewelryService";
import { useParams } from "react-router-dom";
import { useService } from "../../hooks/useService";
// import { authServiceFactory } from "../../services/authService";


export const JewelryList = () => {
  const { categoryId } = useParams();
  const [jewelries, setJewelries] = useState([]);
  const jewelryService = useService(jewelryServiceFactory)
  // const authService = useService(authServiceFactory);

  
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
