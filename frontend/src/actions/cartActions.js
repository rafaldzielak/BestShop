import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCartAction = (product, quantity) => (dispatch) => {
  console.log("quantity: " + quantity);
  let cartContent = localStorage.getItem("cartContent")
    ? JSON.parse(localStorage.getItem("cartContent"))
    : [];

  let productInCart = cartContent ? cartContent.find((p) => p._id === product._id) : 0;
  if (productInCart) {
    productInCart.count = productInCart.count + quantity;
    if (productInCart.count > productInCart.countInStock) productInCart.count = productInCart.countInStock;
  } else {
    productInCart = { ...product, count: quantity };
    if (cartContent.length === 0) cartContent = [productInCart];
    else cartContent.push(productInCart);
  }
  dispatch({ type: CART_ADD_ITEM, payload: cartContent });
  localStorage.setItem("cartContent", JSON.stringify(cartContent));
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
