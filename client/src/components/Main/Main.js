import styles from "./Main.module.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "../Home/Home";
import { JewelryList } from "../JewelryList/JewelryList";
import { JewelryDetails } from "../JewelryItem/JewelryDetails";
// import {Login} from "../../components/Users/Login";

export const Main = () => {
  return (
    <main className={styles["main"]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:categoryId" element={<JewelryList />} />
        <Route path="/:categoryId/:jewelryId" element={<JewelryDetails />} />
        {/* <Route path="/:users/login" element={<Login />} /> */}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      {/* <JewelryList jewelries={jewelries}/> */}
    </main>
  );
};
