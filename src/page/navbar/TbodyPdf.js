import React from "react";
import { useSelector } from "react-redux";

export const TbodyPdf = ({ data }) => {
  const { code } = useSelector((state) => state.login);

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
    </tr>
  );
};
