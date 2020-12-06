import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { listProductReducer, listProductsReducer } from "./reducers/productsReducers";
import { loginUserReducer, registerUserReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  listProducts: listProductsReducer,
  listProduct: listProductReducer,
  loginUser: loginUserReducer,
  registerUser: registerUserReducer,
});

const userLoginFromStorage = localStorage.getItem("userLogin")
  ? JSON.parse(localStorage.getItem("userLogin"))
  : null;
console.log(userLoginFromStorage);
const initialState = { loginUser: { loggedUser: userLoginFromStorage } };
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
