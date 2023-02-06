import React, { useEffect, useState } from "react";
import { ButtonHeader } from "../../../component/buttonGroup/ButtonGroup";
import { LabelGroup } from "../../../component/inputForm/InputGroup";
import "./Styled.css";
// import { Listar } from "../actions/actionProduct";
import { db } from "../../../firebase/Config";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useForm } from "../../../CustomHook/useForm";
import { useDispatch } from "react-redux";
import { loginSincrono } from "../../../action/ActionLogin";

export const Login = () => {
  const [DataClient, setDataClient] = useState([]);
  const [messageError, setMessageError] = useState(null);
  const dispacth = useDispatch();

  const [values, handleInputChange, reset] = useForm({
    codeWeb: "",
    lastname: "",
  });
  const { codeWeb, lastname } = values;

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
    });
    return () => onSuscribe();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (codeWeb && lastname) {
      const resulSearch = DataClient.find(
        ({ code }) => Number(code) === Number(codeWeb)
      );
      if (resulSearch && resulSearch.lastname === lastname) {
        dispacth(loginSincrono(resulSearch));
        reset();
      } else {
        setMessageError("El usuario no existe");
      }
    } else if (!codeWeb) {
      setMessageError("el código es requerido");
    } else if (!lastname) {
      setMessageError("el apellido es requerido");
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div
          id="cardLogin"
          style={{
            width: "60%",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              marginLeft: "8%",
            }}
            className="mt-5"
          >
            <form onSubmit={handleSubmit}>
              <LabelGroup
                type="text"
                name={"codeWeb"}
                onChange={handleInputChange}
                value={codeWeb}
                placeholder={"Código del vendedor"}
                tag={"Código de vendedor"}
                size={90}
              />

              <LabelGroup
                type="text"
                name={"lastname"}
                onChange={handleInputChange}
                value={lastname}
                tag={"Apellido"}
                placeholder={"Apellido del vendedor"}
                size={90}
              />
              {messageError && (
                <div
                  style={{ width: "90%" }}
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

              <ButtonHeader
                type="submit"
                onClick={handleSubmit}
                className="mb-5"
                wd="90%"
              >
                Ingresar
              </ButtonHeader>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
