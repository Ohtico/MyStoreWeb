import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Title } from "../../component/Style/Title";
import TablePrincipal from "../../component/table/TablePrincipal";
import { db } from "../../firebase/Config";
import Tbody from "./Tbody";
import { BiListPlus } from "react-icons/bi";
import { LabelGroup } from "../../component/inputForm/InputGroup";

import { useForm } from "../../CustomHook/useForm";

export const Collection = ({ valuesSearh, resetSearch }) => {
  const [DataClient, setDataClient] = useState([]);
  const [messageError, setMessageError] = useState(null);
  const [DataFiltro, setDataFiltro] = useState(null);

  const { search } = valuesSearh;

  const thead = [
    { name: "Nombre" },
    { name: "Descripción" },
    { name: "Estado" },
    // { name: "Acciones" },
  ];

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
      setDataClient(client);
      resetSearch();
    });
    return () => onSuscribe();
  }, []);

  const [values, handleInputChange, reset] = useForm({
    name: "",
    description: "",
  });
  const { name, description } = values;

  const register = async (e) => {
    e.preventDefault();

    if (name === "") {
      return setMessageError("El nombre es requerido");
    } else if (description === "") {
      return setMessageError("El apellido es requerido");
    }
    await addDoc(collection(db, "collection"), {
      ...values,
      status: 1,
    });
    reset();
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
        Colecciones{" "}
        <BiListPlus
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
                Registrar colección
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
                    size={100}
                    desicion={false}
                  />
                </div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100%" }}
                    name="description"
                    onChange={handleInputChange}
                    value={description}
                  ></textarea>
                  <label for="floatingTextarea2">Breve resumen</label>
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
      {/* {formType && (
          <div style={{ width: "45%" }}>
            <InputSelect
              tag={"Tipo de Operación"}
              data={DataFormType}
              set={setValueFormType}
              value={valueFormType}
            />
          </div>
        )} */}
      <TablePrincipal
        thead={thead}
        data={!DataFiltro ? DataClient : DataFiltro}
        tbodyData={Tbody}
      />
    </div>
  );
};
