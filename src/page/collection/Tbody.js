import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { LabelGroup } from "../../component/inputForm/InputGroup";
import { useForm } from "../../CustomHook/useForm";
import { db } from "../../firebase/Config";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

const Tbody = ({ data }) => {
  const toggleComplete = async (nameProp, valueInput) => {
    await updateDoc(doc(db, "collection", data.id), {
      [nameProp]: valueInput,
    });
  };

  useEffect(() => {
    setValues(data);
  }, []);

  const [values, handleInputChange, reset, setValues] = useForm({});
  const { name, description } = values;

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
        <div className="form">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100%" }}
            name="description"
            onChange={handleInputChange}
            onBlur={() => toggleComplete("description", description)}
            value={description}
          ></textarea>
        </div>
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
