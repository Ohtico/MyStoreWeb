import { types } from "../types/types";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import Swal from "sweetalert2";

export const loginEmailPassword = (email, password) => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(loginSincrono(user.uid, user.displayName));
        Swal.fire({
          title: "Bienvenido",
          showConfirmButton: true,
          confirmButtonText: "Continuar",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem("user", user.uid);
          }
        });
      })
      .catch((e) => {
        Swal.fire({
          title: "El usuario no existe",
          timer: 2000,
          showConfirmButton: false,
        });
      });
  };
};

export const loginSincrono = (dataUser) => {
  return {
    type: types.login,
    dataUser,
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    const auth = getAuth();
    await signOut(auth);
  };
};
export const logout = () => ({
  type: types.logout,
});
