// import { Navigate, Outlet } from "react-router-dom";
// import { useAuthContext } from "../../contexts/AuthContext";

// export const RouteGuard = ({children}) => {
//   const { isAuthenticated } = useAuthContext();

//   if (!isAuthenticated) {
//     return <Navigate to="/user/login" />;
//   }

//   return children ? children : <Outlet />;
// };


import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export const RouteGuard = ({children}) => {
  const { isAuthenticated } = useAuthContext();

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/user/login" state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
};




// export const RouteGuard = ({
//     children
// }) => {

//     const {isAuthenticated} = useAuthContext();

//     if (!isAuthenticated) {
//         return < Navigate to="/user/login"/>
//     }

//     return (
//         <>{children}</>
//     )
// }
