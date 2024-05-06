import { createContext, useContext } from "react";
import { authServiceFactory } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
// import { bagServiceFactory } from "../services/bagService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const authService = authServiceFactory(auth.accessToken);
  const navigate = useNavigate();



  const onRegisterSubmit = async (values) => {
    const { retypePassword, ...registerData } = values;
    if (retypePassword !== registerData.password) {
      console.log("Passwords do not match!");
      return;
    }
    try {
      const result = await authService.register(registerData);

      setAuth(result["token"]);

      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const onLoginSubmit = async (data) => {
    try {
      const result = await authService.login({ ...data });
      setAuth(result["token"]);

      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const onEditPersonalDetailsSubmit = async (data) => {
    try {
      const result = await authService.editPersonalDetails({ ...data });
      console.log(auth);
      // console.log(result);
      setAuth({ ...auth, ...result });
    } catch (err) {
      console.log(err.message);
    }
  };

  const onLogout = async () => {
    await authService.logout();

    setAuth({});
  };


  const context = {
    onRegisterSubmit,
    onLoginSubmit,
    onEditPersonalDetailsSubmit,
    onLogout,
    userId: auth._id,
    token: auth.accessToken,
    userEmail: auth.email,
    isAuthenticated: !!auth.accessToken,
    firstName: auth.firstName,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};
