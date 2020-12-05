import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { listProductReducer, listProductsReducer } from "./reducers/productsReducers";

const reducer = combineReducers({ listProducts: listProductsReducer, listProduct: listProductReducer });

const initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
