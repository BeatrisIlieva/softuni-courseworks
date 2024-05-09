import styles from "./App.module.css";
import "normalize.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "../src/components/Header/Header";
import { Footer } from "../src/components/Footer/Footer";
import { JewelryList } from "../src/components/JewelryList/JewelryList";
import { JewelryItem } from "../src/components/JewelryItem/JewelryItem";
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { Register } from "./components/Register/Register";
import { UserDetails } from "./components/UserDetails/UserDetails";
import { AuthProvider } from "./contexts/AuthContext";
import { Home } from "../src/components/Home/Home";
import { Bag } from "./components/Bag/Bag";

function App() {
  return (
    <AuthProvider>
      <div className={styles["app"]}>
        <Header />
        <main className={styles["main"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:categoryId" element={<JewelryList />} />
            <Route path="/:categoryId/:jewelryId" element={<JewelryItem />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/logout" element={<Logout />} />
            <Route path="/user/details" element={<UserDetails />} />
            <Route path="/user/bag" element={<Bag />} />
            <Route path="/bag/add/:jewelryId" element={<JewelryItem />} />
            <Route path="/bag/decrease/:bagId" element={<Bag />} />
            <Route path="/bag/increase/:bagId" element={<Bag />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
