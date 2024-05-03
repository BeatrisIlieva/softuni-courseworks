import styles from "./App.module.css";
import "normalize.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "../src/components/Header/Header";
import { Footer } from "../src/components/Footer/Footer";
import { JewelryList } from "../src/components/JewelryList/JewelryList";
import { JewelryDetails } from "../src/components/JewelryItem/JewelryDetails";
import { Login } from "./components/Login/Login";
import { AuthContext } from "./contexts/AuthContext";
import { Home } from "../src/components/Home/Home";
import * as authService from "./services/authService";


function App() {
  const [auth, setAuth] = useState({});

  const onLoginSubmit = async (data) => {
    try {
      const result = await authService.login({ ...data });
      setAuth(result);

      // Navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const context = {
    onLoginSubmit,
    userId: auth.user._id,
    token: auth.token,
    userEmail: auth.user.email,
    isAuthenticated: !!auth.token,
  }


  return (
    <AuthContext.Provider value={context}>
      <div className={styles["app"]}>
        <Header />
        <main className={styles["main"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:categoryId" element={<JewelryList />} />
            <Route
              path="/:categoryId/:jewelryId"
              element={<JewelryDetails />}
            />
            <Route path="/users/login" element={<Login />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
