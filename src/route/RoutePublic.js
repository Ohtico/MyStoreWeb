import React from "react";
import { Route, Routes } from "react-router";
import { Login } from "../page/log/login/Login";

export const routerPrivateStore = [
  {
    path: "/auth",
    element: <Login />,
  },
];

const RoutePublic = () => {
  return (
    <div>
      <div className="mt-5">
        <Routes>
          {routerPrivateStore.map(({ path, element }, i) => (
            <Route key={i} path={path} element={element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};
export default RoutePublic;
