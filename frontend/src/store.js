import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { listProductReducer, listProductsReducer } from "./reducers/productsReducers";
import {
  loginUserReducer,
  registerUserReducer,
  updateProfileReducer,
  getAllUsersReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderGetReducer,
  userOrdersGetReducer,
  reviewCreateReducer,
  orderGetAllReducer,
} from "./reducers/orderReducers.js";

const reducer = combineReducers({
  listProducts: listProductsReducer,
  listProduct: listProductReducer,
  loginUser: loginUserReducer,
  registerUser: registerUserReducer,
  getAllUsers: getAllUsersReducer,
  updateProfile: updateProfileReducer,
  cartContent: cartReducer,
  orderCreate: orderCreateReducer,
  orderGet: orderGetReducer,
  userOrdersGet: userOrdersGetReducer,
  orderGetAll: orderGetAllReducer,
  reviewCreate: reviewCreateReducer,
});

const userLoginFromStorage = localStorage.getItem("userLogin")
  ? JSON.parse(localStorage.getItem("userLogin"))
  : null;

const cartFromStorage = localStorage.getItem("cartContent")
  ? JSON.parse(localStorage.getItem("cartContent"))
  : [];
const initialState = {
  loginUser: { loggedUser: userLoginFromStorage },
  cartContent: { cartContent: cartFromStorage },
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
