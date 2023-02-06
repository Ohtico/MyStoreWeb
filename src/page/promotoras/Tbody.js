import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { LabelGroup } from "../../component/inputForm/InputGroup";
import { useForm } from "../../CustomHook/useForm";
import { db } from "../../firebase/Config";
import {
  BsGenderFemale,
  BsGenderMale,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

const Tbody = ({ data }) => {
  const toggleComplete = async (nameProp, valueInput) => {
    await updateDoc(doc(db, "saleswomen", data.id), {
      [nameProp]: valueInput,
    });
  };

  useEffect(() => {
    setValues(data);
  }, []);

  const [values, handleInputChange, reset, setValues] = useForm({});
  const {
    name,
    lastname,
    cellphone,
    email,
    address,
    OutstandingBalance,
    code,
  } = values;

  return (
    <tr>
      <td>
        <LabelGroup
          name="name"
          onChange={handleInputChange}
          onBlur={() => toggleComplete("name", name)}
          value={name}
          tag={""}
          size={100}
        />
      </td>
      <td>
        <LabelGroup
          name="lastname"
          onChange={handleInputChange}
          onBlur={() => toggleComplete("lastname", lastname)}
          value={lastname}
          tag={""}
          size={100}
        />
      </td>
      <td>
        <LabelGroup
          name="code"
          onChange={handleInputChange}
          onBlur={() => toggleComplete("code", code)}
          value={code}
          tag={""}
          size={100}
        />
      </td>
      <td>
        <LabelGroup
          name="cellphone"
          onChange={handleInputChange}
          onBlur={() => toggleComplete("cellphone", cellphone)}
          value={cellphone}
          tag={""}
          size={100}
        />
      </td>
      <td>
        <LabelGroup
          name="email"
          onChange={handleInputChange}
          onBlur={() => toggleComplete("email", email)}
          value={email}
          tag={""}
          size={100}
        />
      </td>
      <td>
        <LabelGroup
          name="address"
          onChange={handleInputChange}
          onBlur={() => toggleComplete("address", address)}
          value={address}
          tag={""}
          size={100}
        />
      </td>
      <td className="text-center">
        {data.genero === "F" ? (
          <BsGenderFemale
            onClick={() => toggleComplete("genero", "M")}
            className="iconLogout iconColor"
            size={"30px"}
          />
        ) : data.genero === "M" ? (
          <BsGenderMale
            onClick={() => toggleComplete("genero", "F")}
            className="iconLogout iconColorMale"
            size={"30px"}
          />
        ) : null}
      </td>
      {/* BsGenderFemale */}
      <td>
        <LabelGroup
          name="OutstandingBalance"
          onChange={handleInputChange}
          onBlur={() =>
            toggleComplete("OutstandingBalance", OutstandingBalance)
          }
          value={OutstandingBalance}
          tag={""}
          size={100}
        />
      </td>
      <td className="text-center">
        {Number(data.status) === 1 ? (
          <BsFillCheckCircleFill
            onClick={() => toggleComplete("status", 0)}
            className="iconLogout iconStatus"
            size={"30px"}
          />
        ) : Number(data.status) === 0 ? (
          <TiDelete
            onClick={() => toggleComplete("status", 1)}
            className="iconLogout iconColorRed"
            size={"30px"}
          />
        ) : null}
      </td>
    </tr>
  );
};

export default Tbody;
