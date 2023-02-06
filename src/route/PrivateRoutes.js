import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { code, isLogged } = useSelector((state) => state.login);

  return code ? (
    children
  ) : (
    <Navigate replace state={{ origin: location }} to="/auth" />
  );
};

export default PrivateRoutes;
