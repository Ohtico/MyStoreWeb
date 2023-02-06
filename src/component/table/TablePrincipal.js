import React from "react";

const bold = { fontWeight: "bold" };

const TablePrincipal = ({
  thead = [],
  tbodyData: TbodyData,
  data = [],
  subTotals,
  tbodyTotal: TbodyTotal,
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm ">
        <thead>
          <tr>
            {thead.map((th, index) =>
              index > 1 ? (
                <th
                  key={th?.name + "_" + index}
                  id="alinear"
                  className="text-center"
                >
                  <div className="d-flex justify-content-center align-items-center mr-4">
                    {th?.name}
                  </div>
                </th>
              ) : (
                <th key={`${th?.name}_${index}`} className="text-center">
                  <div className="d-flex justify-content-center align-items-center mr-4">
                    {th?.name}
                  </div>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TbodyData
              key={`${index}-${Date.now()}-${index}`}
              data={item}
              index={index}
            />
          ))}
          {/* {subTotals.map((item, index) => (
            <TbodyTotal
              key={`${index}-${Date.now()}-${index}`}
              data={item}
              index={index}
            />
          ))} */}

          {subTotals && (
            <tr>
              {subTotals.map((item, index) => (
                <td className="text-center" key={index} isNumeric style={bold}>
                  {item}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablePrincipal;
