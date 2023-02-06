import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin7Line } from "react-icons/ri";
import { addCar } from "../../action/ActionCar";

export const Tbody = ({ data }) => {
  const { code } = useSelector((state) => state.login);
  const { product } = useSelector((state) => state.card);
  const dispacth = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    let deleteProduct = product.filter((e) => e.id !== data.id);
    dispacth(addCar(deleteProduct));
  };

  return (
    <tr>
      <td className="text-center">{data.code}</td>
      <td className="text-center">{data.quantity}</td>
      {Number(code) !== 123456 && (
        <>
          <td className="text-center text-success">${data.price}</td>
          <td className="text-center text-success">{data?.total}</td>
        </>
      )}
      <td>{data.name}</td>
      <td>{data.description}</td>
      <td>
        <RiDeleteBin7Line
          onClick={handleDelete}
          className="iconColorRed mx-3"
          size={"30px"}
        />
      </td>
    </tr>
  );
};
