import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_REMOVE_ALL } from "../constants/cartConstants";
import axios from "axios";

export const addToCartAction = (product, quantity) => (dispatch) => {
  let cartContent = localStorage.getItem("cartContent")
    ? JSON.parse(localStorage.getItem("cartContent"))
    : [];

  let productInCart = cartContent ? cartContent.find((p) => p._id === product._id) : 0;
  if (productInCart) {
    productInCart.count = productInCart.count + quantity;
    if (productInCart.count > productInCart.countInStock) productInCart.count = productInCart.countInStock;
    if (productInCart.count <= 1 && productInCart.countInStock > 0) productInCart.count = 1;
    else productInCart.coun = 0;
  } else {
    productInCart = { ...product, count: quantity };
    if (cartContent.length === 0) cartContent = [productInCart];
    else cartContent.push(productInCart);
  }
  console.log(productInCart);
  console.log(cartContent);
  dispatch({ type: CART_ADD_ITEM, payload: cartContent });
  localStorage.setItem("cartContent", JSON.stringify(cartContent));
};

export const updateCartItemsAction = () => async (dispatch) => {
  let cartContent = localStorage.getItem("cartContent")
    ? JSON.parse(localStorage.getItem("cartContent"))
    : [];

  Promise.all(cartContent.map(async (product) => axios.get(`/api/products/${product._id}`))).then(
    (values) => {
      cartContent.forEach((cartItem, index) => {
        cartItem.countInStock = values[index].data.countInStock;
        if (cartItem.count > cartItem.countInStock) cartItem.count = cartItem.countInStock;
      });
      localStorage.setItem("cartContent", JSON.stringify(cartContent));
      dispatch({ type: CART_ADD_ITEM, payload: cartContent });
    }
  );
};

export const addOneCartAction = (product) => (dispatch) => {
  dispatch(addToCartAction(product, 1));
};

export const removeOneCartAction = (product) => (dispatch) => {
  dispatch(addToCartAction(product, -1));
};

export const removeProductFromCartAction = (product) => (dispatch) => {
  let cartContent = localStorage.getItem("cartContent")
    ? JSON.parse(localStorage.getItem("cartContent"))
    : [];
  cartContent = cartContent.filter((p) => p._id !== product._id);
  localStorage.setItem("cartContent", JSON.stringify(cartContent));
  dispatch({ type: CART_REMOVE_ITEM, payload: product });
};

export const cleanCartAction = () => (dispatch) => {
  localStorage.removeItem("cartContent");
  dispatch({ type: CART_REMOVE_ALL });
};
