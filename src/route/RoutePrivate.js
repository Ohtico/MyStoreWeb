import React from "react";
import { Route, Routes } from "react-router";
import { Collection } from "../page/collection/Collection";
import { MyStore } from "../page/myStore/MyStore";
import { NavbarMyStore } from "../page/navbar/NavbarMyStore";
import { Promotoras } from "../page/promotoras/Index";
import { InventoryOfProduct } from "../page/inventory/InventoryOfProduct";
import { useForm } from "../CustomHook/useForm";
import { Detail } from "../page/myStore/Detail";

const RoutePrivate = () => {
  const [values, handleInputChange, reset] = useForm({
    search: "",
  });

  const routerPrivateStore = [
    {
      path: "/",
      element: <MyStore valuesSearh={values} resetSearch={reset} />,
    },
    {
      path: "/detail",
      element: <Detail />,
    },
    {
      path: "/promotoras",
      element: <Promotoras valuesSearh={values} resetSearch={reset} />,
    },
    {
      path: "/collection",
      element: <Collection valuesSearh={values} resetSearch={reset} />,
    },
    {
      path: "/inventory",
      element: <InventoryOfProduct valuesSearh={values} resetSearch={reset} />,
    },
  ];

  return (
    <div>
      <NavbarMyStore
        valuesSearh={values}
        handleInputChangeSearch={handleInputChange}
      />
      <Routes>
        {routerPrivateStore.map(({ path, element }, i) => (
          <Route key={i} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
};
export default RoutePrivate;
