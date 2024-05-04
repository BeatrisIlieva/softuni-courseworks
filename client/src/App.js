import styles from "./App.module.css";
import "normalize.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "../src/components/Header/Header";
import { Footer } from "../src/components/Footer/Footer";
import { JewelryList } from "../src/components/JewelryList/JewelryList";
import { JewelryDetails } from "../src/components/JewelryItem/JewelryDetails";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { AuthContext } from "./contexts/AuthContext";
import { Home } from "../src/components/Home/Home";
import * as authService from "./services/authService";

function App() {
  const [auth, setAuth] = useState({});

  const onRegisterSubmit = async (values) => {
    const {retypePassword, ...registerData} = values;
    if (retypePassword !== registerData.password) {
      console.log("Passwords do not match!")
      return;
    }
    try {
      const result = await authService.register(values);

      setAuth(result);

      // navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const onLoginSubmit = async (data) => {
    try {
      const result = await authService.login({ ...data });
      setAuth(result);

      // navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  // const context = {
  // onRegisterSubmit,
  //   onLoginSubmit,
  //   userId: auth.user._id,
  //   token: auth.token,
  //   userEmail: auth.user.email,
  //   isAuthenticated: !!auth.token,
  // }
  const context = {
    onRegisterSubmit,
    onLoginSubmit,
    userId: auth._id,
    token: auth.token,
    userEmail: auth.email,
    isAuthenticated: !!auth.token,
  };

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
            <Route path="/users/register" element={<Register />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
