import React, { useEffect, useState } from "react";
import { LabelGroup } from "../../component/inputForm/InputGroup";
import "./Stile.css";
import { BiLogOut } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsCollectionFill } from "react-icons/bs";
import { TfiDropboxAlt } from "react-icons/tfi";
import { FaHome } from "react-icons/fa";
import { CgImport } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../action/ActionLogin";
import { NavLink, useLocation } from "react-router-dom";
import TablePrincipal from "../../component/table/TablePrincipal";
import { Tbody } from "./Tbody";
import { ExportPdf } from "../../component/funciones/ExportPdf";
import { addCar } from "../../action/ActionCar";
import { TbodyPdf } from "./TbodyPdf";

export const NavbarMyStore = ({ valuesSearh, handleInputChangeSearch }) => {
  const { product } = useSelector((state) => state.card);
  const { code, name, lastname } = useSelector((state) => state.login);
  const [AllQuantity, setAllQuantity] = useState(null);
  const [AllQuantityTotal, setAllQuantityTotal] = useState(null);
  const [dataTotalTable, setdataTotalTable] = useState(null);
  const [dateToday, setDateToday] = useState(null);

  const { search } = valuesSearh;
  const dispacth = useDispatch();
  const location = useLocation(); //navigate

  const { pathname } = location;

  const logoutAuth = () => {
    dispacth(logout());
    dispacth(addCar(null));
  };

  const thead = [
    { name: "Código" },
    { name: "Cantidad" },
    { name: "Precio unidad" },
    { name: "Precio total" },
    { name: "Nombre" },
    { name: "Descripción" },
    { name: "Acciones" },
  ];
  const theadCliente = [
    { name: "Código" },
    { name: "Cantidad" },
    { name: "Nombre" },
    { name: "Descripción" },
    { name: "Acciones" },
  ];
  const theadPdf = [
    { name: "Código" },
    { name: "Cantidad" },
    { name: "Precio unidad" },
    { name: "Precio total" },
    { name: "Nombre" },
    { name: "Descripción" },
  ];
  const theadClientePdf = [
    { name: "Código" },
    { name: "Cantidad" },
    { name: "Nombre" },
    { name: "Descripción" },
  ];

  useEffect(() => {
    if (product) {
      let resultQuantity = product.map(({ quantity }) => quantity);
      let resultTotal = product.map(({ total }) => total);

      setAllQuantity(resultQuantity);
      setAllQuantityTotal(resultTotal);
    }
  }, [product]);

  useEffect(() => {
    if (AllQuantity) {
      const initialValue = 0;
      const sumWithInitial = AllQuantity.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue),
        initialValue
      );
      const totales = AllQuantityTotal.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue),
        initialValue
      );

      let data = ["Total", sumWithInitial, "", totales];

      setdataTotalTable(data);
    }
  }, [AllQuantity, AllQuantityTotal, product]);

  const handleTime = () => {
    let fechaHoy = new Date();
    setDateToday(
      fechaHoy.toLocaleDateString() +
        " " +
        fechaHoy.getHours() +
        ":" +
        fechaHoy.getMinutes() +
        ":" +
        fechaHoy.getSeconds()
    );
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModalCar"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {product && product.length > 0
                  ? " Carrito"
                  : "Agrega un producto para generar una orden"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div id="pressPdf">
              <p>Usuario: {`${name} ${lastname}`}</p>
              <p>Código: {code}</p>
              <p>Fecha y hora: {dateToday}</p>

              <TablePrincipal
                thead={Number(code) !== 123456 ? theadPdf : theadClientePdf}
                data={product ? product : []}
                tbodyData={TbodyPdf}
                subTotals={
                  Number(code) !== 123456 && dataTotalTable
                    ? dataTotalTable
                    : []
                }
              />
            </div>

            <div className="modal-body">
              {product && product.length > 0 ? (
                <TablePrincipal
                  thead={Number(code) !== 123456 ? thead : theadCliente}
                  data={product ? product : []}
                  tbodyData={Tbody}
                  subTotals={
                    Number(code) !== 123456 && dataTotalTable
                      ? dataTotalTable
                      : []
                  }
                />
              ) : (
                <div className="d-flex justify-content-center">
                  <img
                    src="https://res.cloudinary.com/ohtico/image/upload/v1672341740/empty_cart_lx6634.png"
                    alt="carVacio"
                  />
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              {product && product.length > 0 && (
                <button
                  type="button"
                  onClick={() => ExportPdf("pressPdf", `orden_de_compra`)}
                  className="btn btn-primary"
                >
                  <CgImport
                    className="mx-2 iconLogout iconColorCar"
                    size={"20px"}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <nav id="BackNav" className="navbar fixed-top">
        <div className="container-fluid">
          {pathname !== "/detail" && (
            <LabelGroup
              type="search"
              name={"search"}
              onChange={handleInputChangeSearch}
              value={search}
              tag={""}
              size={40}
            />
          )}

          <div className="float-end ">
            <NavLink to={"/"}>
              <FaHome className="iconLogout mx-2" size={"30px"} />
            </NavLink>
            {Number(code) === 12854063 && (
              <>
                <NavLink to="/inventory">
                  <TfiDropboxAlt className=" mx-2 iconLogout" size={"30px"} />
                </NavLink>
                <NavLink to="/collection">
                  <BsCollectionFill className="iconLogout" size={"30px"} />
                </NavLink>

                <NavLink to={"/promotoras"}>
                  <AiOutlineUsergroupAdd
                    className="ms-2 iconLogout"
                    size={"30px"}
                  />
                </NavLink>
              </>
            )}

            <BsCart4
              data-bs-toggle="modal"
              data-bs-target="#exampleModalCar"
              className="mx-2 iconLogout iconColorMale"
              onClick={handleTime}
              size={"30px"}
            />
            <BiLogOut
              onClick={logoutAuth}
              className="mx-2 iconLogout iconColorMale"
              size={"30px"}
            />
          </div>

          {/* <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          ></div> */}
        </div>
      </nav>
    </>
  );
};
