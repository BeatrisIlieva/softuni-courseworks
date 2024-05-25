import { createContext, useContext } from "react";
import { authServiceFactory } from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const authService = authServiceFactory(auth.accessToken);
  const navigate = useNavigate();
  const location = useLocation();

  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);

  const onRegisterSubmit = async (values) => {
    const email = values.email.value;
    const retypeEmail = values.retypeEmail.value;
    const firstName = values.firstName.value;
    const lastName = values.lastName.value;
    const password = values.password.value;
    const retypePassword = values.retypePassword.value;
    const data = { email, password, firstName, lastName };

    if (retypePassword !== password) {
      console.log("Passwords do not match!");
      return;
    }

    if (retypeEmail !== email) {
      console.log("Emails do not match!");
      return;
    }

    try {
      const result = await authService.register({ ...data });

      setAuth(result["token"]);

      setWishlist([]);

      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const onLoginSubmit = async (values) => {
    const email = values.email.value;
    const password = values.password.value;

    const data = { email, password };

    const from = location.state?.from?.pathname || "/";

    try {
      const result = await authService.login({ ...data });
      setAuth(result["token"]);

      setWishlist([]);

      navigate(from, { replace: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  const onLogout = async () => {
    await authService.logout();

    setWishlist([]);

    setAuth({});
  };

  const getOne = async (userId) => {
    const user = await authService.getOne(userId);

    return user;
  };

  const context = {
    onRegisterSubmit,
    onLoginSubmit,
    onLogout,
    getOne,
    userId: auth._id,
    token: auth.accessToken,
    isAuthenticated: !!auth.accessToken,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};
