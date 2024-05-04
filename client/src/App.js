import styles from "./App.module.css";
import "normalize.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "../src/components/Header/Header";
import { Footer } from "../src/components/Footer/Footer";
import { JewelryList } from "../src/components/JewelryList/JewelryList";
import { JewelryDetails } from "../src/components/JewelryItem/JewelryDetails";
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { Register } from "./components/Register/Register";
import { AuthContext } from "./contexts/AuthContext";
import { Home } from "../src/components/Home/Home";
import {authServiceFactory} from "./services/authService";
// import {userProfileService} from "./services/UserProfileService";
import { useService } from "./hooks/useService";

function App() {
  const [auth, setAuth] = useState({});
  const authService = authServiceFactory(auth.accessToken);
  // const upService = useService(userProfileService)

  const onRegisterSubmit = async (values) => {
    const {retypePassword, ...registerData} = values;
    if (retypePassword !== registerData.password) {
      console.log("Passwords do not match!")
      return;
    }
    try {
      const result = await authService.register(registerData);

      setAuth(result["token"]);

      // navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const onLoginSubmit = async (data) => {
    try {
      const result = await authService.login({ ...data });
      setAuth(result["token"]);

      // navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const onLogout = async () => {
    await authService.logout();

    setAuth({});
  }

  const context = {
    onRegisterSubmit,
    onLoginSubmit,
    onLogout,
    userId: auth._id,
    token: auth.accessToken,
    userEmail: auth.email,
    isAuthenticated: !!auth.accessToken,
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
            <Route path="/users/logout" element={<Logout />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
