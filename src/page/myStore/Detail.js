import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/Config";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { Title } from "../../component/Style/Title";
import { useDispatch, useSelector } from "react-redux";
import { BsCartPlusFill } from "react-icons/bs";
import { LabelGroup } from "../../component/inputForm/InputGroup";
import { FuncOnlyNumber } from "../../component/funciones/FuncOnlyNumber";
import { useForm } from "../../CustomHook/useForm";
import { addCar } from "../../action/ActionCar";

export const Detail = () => {
  const [DataProduct, setDataProduct] = useState([]);
  const [positionImage, setpositionImage] = useState(0);
  const location = useLocation();
  const { produc = "" } = queryString.parse(location.search);
  const { code } = useSelector((state) => state.login);
  const [ProductCurrent, setProductCurrent] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const dispacth = useDispatch();
  const { product } = useSelector((state) => state.card);

  //   produc
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
      let dataProductSearch = client.find(({ id }) => id === produc);
      setDataProduct(dataProductSearch);
    });
    return () => onSuscribe();
  }, []);

  const [values, handleInputChange, reset, setValues] = useForm({
    quantity: "",
    total: 0,
  });
  const { quantity } = values;

  const handleCar = (e) => {
    e.preventDefault();
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
    } else if (product && productExis.length > 0) {
      productExis[0].quantity =
        Number(productExis[0].quantity) + Number(quantity);
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
      <div className="container margenImage">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            {DataProduct.length !== 0 && (
              <img
                style={{ width: "100%", height: "70%" }}
                src={DataProduct?.image[positionImage]}
                className="card-img-top shadow rounded"
                alt={DataProduct?.name}
              />
            )}
            {DataProduct.length !== 0 &&
              DataProduct?.image.map((e, i) => (
                <img
                  onClick={() => setpositionImage(i)}
                  style={{ width: "20%", height: "20%" }}
                  src={e}
                  className="card-img-top shadow rounded my-2 me-1 iconLogout"
                  alt={e}
                />
              ))}
          </div>
          <div className="col-sm-12 col-md-6">
            <Title size="30px">{DataProduct.name}</Title>
            <div className="d-flex">
              <Title we="500" size="18px">
                Colección:
              </Title>
              <Title className="ms-2" we="500" size="18px">
                {DataProduct.collection}
              </Title>
            </div>
            <div className="d-flex">
              <Title we="500" size="20px">
                Descripción:
              </Title>
              <Title className="ms-2" we="500" size="20px">
                {DataProduct.description}
              </Title>
            </div>
            {Number(code) !== 123456 && (
              <div className="d-flex">
                <Title we="500" size="20px">
                  Precio:
                </Title>
                <Title className=" ms-2" we="500" size="20px">
                  <span className="text-success ">${DataProduct.price}</span>
                </Title>
              </div>
            )}
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => setProductCurrent(DataProduct)}
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
    </>
  );
};
