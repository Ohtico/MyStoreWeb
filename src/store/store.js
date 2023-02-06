import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
// import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { carReducer } from "../reducer/carReducer";

import { loginReducer } from "../reducer/loginReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
  key: "root",
  storage: storage,
};

const reducers = combineReducers({
  login: persistReducer(persistConfig, loginReducer),
  card: carReducer,
});

const store = createStore(reducers, composeEnhancers());
let persistor = persistStore(store);
export { store, persistor };
