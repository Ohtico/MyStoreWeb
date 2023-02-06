import { types } from "../types/types";

export const carReducer = (state = [], action) => {
  switch (action.type) {
    case types.car:
      return {
        ...state,
        product: action.dataCar,
      };

    default:
      return state;
  }
};
