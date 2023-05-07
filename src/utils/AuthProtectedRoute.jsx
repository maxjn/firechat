import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AuthProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthProtectedRoute;
