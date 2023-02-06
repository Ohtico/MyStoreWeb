import {
  collection,
  getDocs,
  onSnapshot,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { db } from "../../firebase/Config";
import { BsCartPlusFill } from "react-icons/bs";
import { AiOutlineArrowDown } from "react-icons/ai";
import { LabelGroup } from "../../component/inputForm/InputGroup";
import { useForm } from "../../CustomHook/useForm";
import { addCar } from "../../action/ActionCar";
import { FuncOnlyNumber } from "../../component/funciones/FuncOnlyNumber";

export const MyStore = ({ valuesSearh, resetSearch }) => {
  const { product } = useSelector((state) => state.card);

  const [DataProduct, setDataProduct] = useState([]);
  const [DataProductAll, setDataProductAll] = useState([]);
  const [DataFiltro, setDataFiltro] = useState(null);
  const { search } = valuesSearh;
  const { code } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [lastPage, setlastPage] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const dispacth = useDispatch();

  const [ProductCurrent, setProductCurrent] = useState(null);

  const obtenerLasat = async (data) => {
    const documentSnapshots = await getDocs(data);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    setlastPage(lastVisible);
  };

  useEffect(() => {
    const data = query(collection(db, "product"));

    const onSuscribe = onSnapshot(data, (QuerySnapshot) => {
      const client = [];
      QuerySnapshot.forEach((doc) => {
        client.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setDataProductAll(client);
      resetSearch();
    });
    return () => onSuscribe();
  }, []);

  useEffect(() => {
    const data = query(collection(db, "product"), limit(12));
    obtenerLasat(data);
    const onSuscribe = onSnapshot(data, (QuerySnapshot) => {
      const client = [];
      QuerySnapshot.forEach((doc) => {
        client.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setDataProduct(client);
      resetSearch();
    });
    return () => onSuscribe();
  }, []);

  const handleNextPage = () => {
    const data = query(
      collection(db, "product"),
      startAfter(lastPage),
      limit(12)
    );
    obtenerLasat(data);
    const onSuscribe = onSnapshot(data, (QuerySnapshot) => {
      const client = [];
      const isCollectionsEmty = QuerySnapshot.size === 0;
      if (!isCollectionsEmty) {
        QuerySnapshot.forEach((doc) => {
          client.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setDataProduct(DataProduct.concat(client));
        resetSearch();
      } else {
        return setIsEmpty(true);
      }
      setIsEmpty(false);
    });
    return () => onSuscribe();
  };

  useEffect(() => {
    if (search) {
      const dataFilter = DataProductAll.filter(
        ({ name, status }) =>
          name.toLowerCase().includes(search.toLowerCase()) && status === 1
      );
      if (dataFilter) {
        setDataFiltro(dataFilter);
      }
    } else {
      setDataFiltro(null);
    }
  }, [search]);

  // 123456
  // addCar

  const [values, handleInputChange, reset, setValues] = useForm({
    quantity: "",
    total: 0,
  });
  const { quantity } = values;

  const handleCar = (e) => {
    e.preventDefault();
    // console.log();
    // ProductCurrent.stock
    const arrayProducto = [];
    if (product) product.map((e) => arrayProducto.push(e));
    let productExis = product?.filter((e) => e.id === ProductCurrent.id);
    const data = {
      ...ProductCurrent,
      ...values,
    };
    if (!quantity) {
      setMessageError("Ingrese la cantidad a solicitar");
    } else if (Number(quantity) < 0 || Number(quantity) === 0) {
      setMessageError("La cantidad no puede ser menor o igual a cero");
    } else if (quantity > Number(ProductCurrent.stock)) {
      setMessageError(
        `La cantidad a reservar supera a la cantidad disponible ${ProductCurrent.stock}`
      );
    } else if (product && productExis.length > 0) {
      let quantityNow = Number(productExis[0].quantity) + Number(quantity);
      productExis[0].quantity = quantityNow;
      let multi = Number(quantityNow) * Number(productExis[0].price);
      productExis[0].total = multi;
      let productNew = arrayProducto?.filter((e) => e.id !== ProductCurrent.id);
      document.querySelector(".closeModal").click();
      setMessageError(null);
      reset();
      dispacth(addCar(productNew.concat(productExis)));
    } else {
      document.querySelector(".closeModal").click();
      arrayProducto.push(data);
      setMessageError(null);
      reset();
      dispacth(addCar(arrayProducto));
    }
  };

  useEffect(() => {
    if (quantity && quantity > 0) {
      let multi = Number(quantity) * Number(ProductCurrent.price);
      setValues({
        ...values,
        total: multi,
      });
    } else {
      setValues({
        ...values,
        total: 0,
      });
    }
  }, [quantity]);

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cantidad que desea agregar
              </h1>
              <button
                type="button"
                className="btn-close closeModal"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                {messageError && (
                  <div
                    style={{ width: "100%" }}
                    className="alert alert-danger alert-dismissible fade show my-4"
                    role="alert"
                  >
                    {messageError}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                      onClick={() => setMessageError(null)}
                    ></button>
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2rem",
                  }}
                >
                  <LabelGroup
                    tipo={"number"}
                    name={"quantity"}
                    onChange={(e) => FuncOnlyNumber(e, setValues, values)}
                    value={quantity}
                    tag={"Cantidad *"}
                    size={45}
                    desicion={false}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={reset}
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  onClick={handleCar}
                  className="btn btn-primary"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-5 container">
        <div className="row">
          {DataProduct && !DataFiltro
            ? DataProduct.map((e, index) => {
                const { image, name, description, price, id } = e;
                return (
                  <div
                    className="col-sm-6 col-md-4 col-xl-3 d-flex justify-content-center  p-1"
                    key={index}
                  >
                    <div
                      className="mt-4 shadow p-2 mb-5 bg-body rounded"
                      style={{ width: "17rem" }}
                    >
                      <img
                        style={{ width: "100%", height: "60%" }}
                        src={image[0]}
                        className="card-img-top rounded iconLogout"
                        alt={name}
                        onClick={() => navigate(`/detail?produc=${id}`)}
                      />
                      <div className="card-body">
                        <h5
                          className="card-title iconLogout"
                          onClick={() => navigate(`/detail?produc=${id}`)}
                        >
                          {name}
                        </h5>

                        <span
                          className="d-inline-block text-truncate"
                          style={{ maxWidth: "120px" }}
                        >
                          {description}
                        </span>

                        {Number(code) !== 123456 && (
                          <h5 className="text-success ">Precio: ${price}</h5>
                        )}
                        <button
                          className="btn btn-primary mb-4 float-end"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => setProductCurrent(e)}
                        >
                          <BsCartPlusFill
                            // onClick={logoutAuth}
                            className="iconLogout iconColorCar"
                            size={"30px"}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : DataFiltro.map((e, index) => {
                const { image, name, description, price, id } = e;
                return (
                  <div
                    className="col-sm-6 col-md-4 col-xl-3 d-flex justify-content-center  p-1"
                    key={index}
                  >
                    <div
                      className="mt-4 shadow p-2 mb-5 bg-body rounded"
                      style={{ width: "17rem" }}
                    >
                      <img
                        style={{ width: "100%", height: "60%" }}
                        src={image[0]}
                        className="card-img-top rounded iconLogout"
                        alt={name}
                        onClick={() => navigate(`/detail?produc=${id}`)}
                      />
                      <div className="card-body">
                        <h5
                          className="card-title iconLogout"
                          onClick={() => navigate(`/detail?produc=${id}`)}
                        >
                          {name}
                        </h5>

                        <span
                          className="d-inline-block text-truncate"
                          style={{ maxWidth: "120px" }}
                        >
                          {description}
                        </span>

                        {Number(code) !== 123456 && (
                          <h5 className="text-success ">Precio: ${price}</h5>
                        )}
                        <button
                          className="btn btn-primary mb-4 float-end"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => setProductCurrent(e)}
                        >
                          <BsCartPlusFill
                            // onClick={logoutAuth}
                            className="iconLogout iconColorCar"
                            size={"30px"}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          {!isEmpty ? (
            <div className="d-flex justify-content-center mb-5">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextPage}
              >
                <AiOutlineArrowDown
                  // onClick={logoutAuth}
                  className="iconLogout iconColorCar"
                  size={"30px"}
                />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
