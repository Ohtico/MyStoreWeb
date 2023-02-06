// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
  // const { authUser } = useContext(AuthContext);

  //   const { dataUser, isLogged } = useSelector((state) => state.auth);

  const { code, isLogged } = useSelector((state) => state.login);
  console.log(code);

  return code ? <Navigate to="/" /> : children;
};

export default PublicRoute;
