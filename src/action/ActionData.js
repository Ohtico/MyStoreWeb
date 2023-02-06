// import { types } from "../types/types";
// import { LoadData } from "../helpers/LoadData";
// import { db } from "../firebase/FirebaseConfig";
import {
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  collection,
  getDocs,
} from "@firebase/firestore";
import Swal from "sweetalert2";
import { LoadData } from "../helpers/LoadData";

export const Listar = (coleciones, set) => {
  return async (dispatch) => {
    const data = await LoadData(coleciones);

    console.log(data);
    set(data);
    // dispatch(setProduct(product));
    // dispatch(setCategoria(product));
  };
};

// export const setProduct = (product) => ({
//     type: types.productLoad,
//     payload: product,
//   });

// export const setProduct = (product) => ({
//     type: types.productLoad,
//     payload: product,
//   });
