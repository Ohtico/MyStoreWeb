export const FuncOnlyNumber = (e, setValues, values) => {
  const posibleResult = e.target.value.replace(/[^0-9,.]/g, "");

  const nameVariable = e.target.name;
  return setValues({ ...values, [nameVariable]: posibleResult });
};
