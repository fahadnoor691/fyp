// import { Outlet, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";

// const PrivateRoutes = () => {
//   // check the existence of auth Token
//   let auth = {
//     token: localStorage.getItem("authTokens")
//       ? JSON.parse(localStorage.getItem("authTokens"))
//       : null,
//   };
//   //console.log(auth.token)

//   // return to the parent route if token exists
//   return auth.token ? <Outlet /> : <Navigate to="/" />;
// };

// export default PrivateRoutes;
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { authTokens } = useContext(AuthContext);

  return authTokens ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
