import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { listProductReducer, listProductsReducer } from "./reducers/productsReducers";
import { loginUserReducer, registerUserReducer } from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
  listProducts: listProductsReducer,
  listProduct: listProductReducer,
  loginUser: loginUserReducer,
  registerUser: registerUserReducer,
  cartContent: cartReducer,
});

const userLoginFromStorage = localStorage.getItem("userLogin")
  ? JSON.parse(localStorage.getItem("userLogin"))
  : null;

const cartFromStorage = localStorage.getItem("cartContent")
  ? JSON.parse(localStorage.getItem("cartContent"))
  : [];
console.log(userLoginFromStorage);
const initialState = {
  loginUser: { loggedUser: userLoginFromStorage },
  cartContent: { cartContent: cartFromStorage },
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;