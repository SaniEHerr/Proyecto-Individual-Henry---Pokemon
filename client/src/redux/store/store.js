import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducer/reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Esta linea conecta la app con la extension de REDUX DEVTOOLS del NAVEGADOR

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunkMiddleware)) // Esta linea sirve para que podamos hacer peticiones a nuestro servidor, o sea, al back
);

export default store;
