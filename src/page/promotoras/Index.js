import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Title } from "../../component/Style/Title";
import TablePrincipal from "../../component/table/TablePrincipal";
import { db } from "../../firebase/Config";
import Tbody from "./Tbody";
import { AiOutlineUserAdd } from "react-icons/ai";
import { LabelGroup } from "../../component/inputForm/InputGroup";
import InputSelect from "../../component/inputSelect/InpusctSelect";
import { useForm } from "../../CustomHook/useForm";

export const Promotoras = ({ valuesSearh, resetSearch }) => {
  const [DataClient, setDataClient] = useState([]);
  const [messageError, setMessageError] = useState(null);
  const [selectGenero, setSelectGener] = useState(null);
  const [DataFiltro, setDataFiltro] = useState(null);

  const { search } = valuesSearh;

  const thead = [
    { name: "Nombre" },
    { name: "Apellido" },
    { name: "Código" },
    { name: "Celular" },
    { name: "Correo" },
    { name: "Dirreción" },
    { name: "Genero" },
    { name: "Saldo pendiente" },
    { name: "Estado" },
    // { name: "Acciones" },
  ];

  useEffect(() => {
    const data = query(collection(db, "saleswomen"));
    const onSuscribe = onSnapshot(data, (QuerySnapshot) => {
      const client = [];
      QuerySnapshot.forEach((doc) => {
        client.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setDataClient(client);
      resetSearch();
    });
    return () => onSuscribe();
  }, []);

  const dataSelect = [
    {
      label: "Femenino",
      value: "F",
    },
    {
      label: "Masculino",
      value: "M",
    },
  ];

  const [values, handleInputChange, reset, setValues] = useForm({
    name: "",
    lastname: "",
    cellphone: "",
    email: "",
    address: "",
    OutstandingBalance: "",
    code: "",
  });
  const {
    name,
    lastname,
    cellphone,
    email,
    address,
    OutstandingBalance,
    code,
  } = values;

  const register = async (e) => {
    e.preventDefault();

    let searchCode = DataClient.find((e) => Number(e.code) === Number(code));

    if (name === "") {
      return setMessageError("El nombre es requerido");
    } else if (lastname === "") {
      return setMessageError("El apellido es requerido");
    } else if (cellphone === "") {
      return setMessageError("El numero de contacto es requerido");
    } else if (code === "") {
      return setMessageError("El código es requerido");
    } else if (selectGenero === null) {
      return setMessageError("El genero es requerido");
    } else if (searchCode) {
      return setMessageError(
        "Ya existe un usuario con este código, el código debe ser unico y no puede estar repetido, por favor intente nuevamente"
      );
    }

    await addDoc(collection(db, "saleswomen"), {
      ...values,
      status: 1,
      genero: selectGenero.value,
    });
    reset();
    setSelectGener(null);
    setMessageError(null);
    document.querySelector(".btn-close").click();
  };

  useEffect(() => {
    if (search) {
      const dataFilter = DataClient.filter(
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
        Promotoras{" "}
        <AiOutlineUserAdd
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
                Registrar promotor/a
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
                    name={"lastname"}
                    onChange={handleInputChange}
                    value={lastname}
                    tag={"Apellido"}
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
                    name={"cellphone"}
                    onChange={handleInputChange}
                    value={cellphone}
                    tag={"Celular"}
                    size={45}
                    desicion={false}
                  />
                  <LabelGroup
                    tipo={"text"}
                    name={"email"}
                    onChange={handleInputChange}
                    value={email}
                    tag={"Correo"}
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
                    name={"address"}
                    onChange={handleInputChange}
                    value={address}
                    tag={"Dirección"}
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

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2rem",
                  }}
                >
                  <LabelGroup
                    tipo={"text"}
                    name={"OutstandingBalance"}
                    onChange={handleInputChange}
                    value={OutstandingBalance}
                    tag={"Saldo pendiente"}
                    size={45}
                    desicion={false}
                  />

                  <div style={{ width: "45%" }}>
                    <InputSelect
                      tag={"Genero"}
                      data={dataSelect}
                      set={setSelectGener}
                      value={selectGenero}
                    />
                  </div>
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
    </div>
  );
};
