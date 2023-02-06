import {
  addDoc,
  collection,
  onSnapshot,
  query,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Title } from "../../component/Style/Title";
import TablePrincipal from "../../component/table/TablePrincipal";
import { db } from "../../firebase/Config";
import Tbody from "./Tbody";
import { ImFolderPlus } from "react-icons/im";
import { LabelGroup } from "../../component/inputForm/InputGroup";
import InputSelect from "../../component/inputSelect/InpusctSelect";
import { useForm } from "../../CustomHook/useForm";
import { LoadImage } from "../../helpers/LoadImage";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowDown } from "react-icons/ai";

export const InventoryOfProduct = ({ valuesSearh, resetSearch }) => {
  const [DataClient, setDataClient] = useState([]);
  const [DataProductAll, setDataProductAll] = useState([]);

  const [messageError, setMessageError] = useState(null);
  const [selectGenero, setSelectGener] = useState(null);
  const [DataCollection, setDataCollection] = useState([]);
  const [dataFromSelect, setdataFromSelect] = useState([]);
  const [DataFiltro, setDataFiltro] = useState(null);
  const [lastPage, setlastPage] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const obtenerLasat = async (data) => {
    const documentSnapshots = await getDocs(data);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    setlastPage(lastVisible);
  };
  const { search } = valuesSearh;

  const [img, setImg] = useState();
  let imgUpload = [];
  let image = [];

  const thead = [
    { name: "Código" },
    { name: "Nombre" },
    { name: "Precio" },
    { name: "Descuento" },
    { name: "Stock" },
    { name: "Colección" },
    { name: "Descripción" },
    { name: "Estado" },
  ];

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
      setDataClient(client);
    });
    return () => onSuscribe();
  }, []);

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
    });
    return () => onSuscribe();
  }, []);

  const [values, handleInputChange, reset] = useForm({
    name: "",
    price: "",
    discount: "",
  });
  const { name, price, discount, description, stock, code } = values;

  const uploadImg = () => {
    document.getElementById("upload").click();
  };

  const handleUpload = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      LoadImage(file)
        .then((resp) => {
          imgUpload.push(resp);
          setImg(imgUpload);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const register = async (e) => {
    e.preventDefault();
    image = img;
    if (name === "") {
      return setMessageError("El nombre es requerido");
    } else if (price === "") {
      return setMessageError("El apellido es requerido");
    } else if (discount === "") {
      return setMessageError("El numero de contacto es requerido");
    } else if (selectGenero === null) {
      return setMessageError("La colección es requerida");
    }

    await addDoc(collection(db, "product"), {
      ...values,
      status: 1,
      collection: selectGenero.value,
      image,
    });
    reset();
    setSelectGener(null);
    setMessageError(null);
    setImg(null);
    document.querySelector(".btn-close").click();
  };

  useEffect(() => {
    const data = query(collection(db, "collection"));
    const onSuscribe = onSnapshot(data, (QuerySnapshot) => {
      const client = [];
      QuerySnapshot.forEach((doc) => {
        client.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setDataCollection(client);
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
        setDataClient(DataClient.concat(client));
        resetSearch();
      } else {
        return setIsEmpty(true);
      }
      setIsEmpty(false);
    });
    return () => onSuscribe();
  };

  useEffect(() => {
    let dataSelect = DataCollection.map(({ name }) => ({
      label: name,
      value: name,
    }));
    setdataFromSelect(dataSelect);
  }, [DataCollection]);

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

  return (
    <div className="mt-5 p-2">
      <Title className="margenTitle">
        Inventario de producto
        <ImFolderPlus
          // onClick={() => toggleComplete("status", 0)}
          className="ms-2 iconLogout iconStatus"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          size={"30px"}
        />
      </Title>

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
                Registrar producto
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={register}>
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
                    tipo={"text"}
                    name={"name"}
                    onChange={handleInputChange}
                    value={name}
                    tag={"Nombre"}
                    size={45}
                    desicion={false}
                  />
                  <LabelGroup
                    tipo={"text"}
                    name={"price"}
                    onChange={handleInputChange}
                    value={price}
                    tag={"Precio"}
                    size={45}
                    desicion={false}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2rem",
                  }}
                >
                  <LabelGroup
                    tipo={"text"}
                    name={"discount"}
                    onChange={handleInputChange}
                    value={discount}
                    tag={"Descuento en porcentaje"}
                    size={45}
                    desicion={false}
                  />
                  <div style={{ width: "45%" }}>
                    <InputSelect
                      tag={"Colección"}
                      data={dataFromSelect}
                      set={setSelectGener}
                      value={selectGenero}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2rem",
                  }}
                >
                  <LabelGroup
                    tipo={"text"}
                    name={"stock"}
                    onChange={handleInputChange}
                    value={stock}
                    tag={"Cantidad en stock"}
                    size={45}
                    desicion={false}
                  />
                  <LabelGroup
                    tipo={"text"}
                    name={"code"}
                    onChange={handleInputChange}
                    value={code}
                    tag={"Código"}
                    size={45}
                    desicion={false}
                  />
                </div>
                <div className="form">
                  <textarea
                    className="form-control"
                    id="floatingTextarea2"
                    style={{ height: "100%" }}
                    name="description"
                    onChange={handleInputChange}
                    value={description}
                  ></textarea>
                </div>

                <div className="my-3">
                  <div
                    id="carouselExampleControls"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {img &&
                        img.map((e) => (
                          <>
                            <div className="carousel-item active">
                              <img src={e} className="d-block w-50" alt={e} />
                            </div>
                          </>
                        ))}
                    </div>

                    {img && img.length > 1 && (
                      <>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target="#carouselExampleControls"
                          data-bs-slide="prev"
                        >
                          <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target="#carouselExampleControls"
                          data-bs-slide="next"
                        >
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </>
                    )}
                  </div>
                  <button
                    type="button"
                    style={{ width: "100%" }}
                    onClick={uploadImg}
                    className="btn btn-outline-primary"
                  >
                    Seleccionar imagen
                  </button>
                  <input
                    type="file"
                    multiple
                    id="upload"
                    onChange={handleUpload}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={(e) => register(e)}
                  className="btn btn-primary"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <TablePrincipal
        thead={thead}
        data={!DataFiltro ? DataClient : DataFiltro}
        tbodyData={Tbody}
      />

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
  );
};
