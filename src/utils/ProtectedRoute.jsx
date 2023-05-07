import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const condition = children.type.name === "Home" ? !currentUser : currentUser;
  if (condition) {
    return children.type.name === "Home" ? (
      <Navigate to="/login" />
    ) : (
      <Navigate to="/" />
    );
  }

  return children;
};

export default ProtectedRoute;
