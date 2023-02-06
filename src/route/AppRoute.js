import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "../page/log/login/Login";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoute from "./PublicRoute";
import RoutePrivate from "./RoutePrivate";
import RoutePublic from "./RoutePublic";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas prublicas */}

        <Route
          path="/auth/*"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Ruta privadas */}
        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <RoutePrivate />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
