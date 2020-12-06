import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartContent: [] }, action) => {
  const { payload } = action;
  switch (action.type) {
    case CART_ADD_ITEM:
      console.log(payload);
      return {
        cartContent: payload,
      };
    case CART_REMOVE_ITEM:
      console.log(payload);
      console.log(state);
      return {
        cartContent: state.cartContent.filter((product) => product._id !== payload._id),
      };
    default:
      return state;
  }
};
