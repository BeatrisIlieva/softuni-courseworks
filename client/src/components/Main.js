import styles from "./Main.module.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "../components/Home";
import { JewelryList } from "../components/JewelryList";
import { JewelryDetails } from "../components/JewelryDetails";

export const Main = () => {
  return (
    <main className={styles["main"]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:categoryId" element={<JewelryList />} />
        <Route path="/:categoryId/:jewelryId" element={<JewelryDetails />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      {/* <JewelryList jewelries={jewelries}/> */}
    </main>
  );
};
