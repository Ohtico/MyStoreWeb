import { types } from "../types/types";

export const addCar = (dataCar) => {
  return {
    type: types.car,
    dataCar,
  };
};
