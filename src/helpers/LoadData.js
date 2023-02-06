import {
  collection,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/Config";

export const LoadData = async (coleciones) => {
  const [first, setfirst] = useState([]);
  console.log(coleciones);
  const data = await query(collection(db, coleciones));
  const onSuscribe = onSnapshot(data, (QuerySnapshot) => {
    const client = [];
    QuerySnapshot.forEach((doc) => {
      client.push({
        ...doc.data(),
        id: doc.id,
      });
    });
  });

  return onSuscribe;
};
