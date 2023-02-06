import { types } from "../types/types";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...action.dataUser,
        logged: true,
      };
    case types.logout:
      return {
        ...state,
        code: null,
        isLogged: false,
      };
    default:
      return state;
  }
};
