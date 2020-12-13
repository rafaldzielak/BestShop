import {
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_RESET,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_FAIL,
  GET_USER_ORDERS_SUCCESS,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return { loading: true };
    case PLACE_ORDER_SUCCESS:
      return { loading: false, id: action.payload._id, stripeOrder: action.payload.stripeOrder };
    case PLACE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case PLACE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { loading: true };
    case GET_ORDER_SUCCESS:
      return { loading: false, orderDetails: action.payload };
    case GET_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userOrdersGetReducer = (state = { ordersDetails: [] }, action) => {
  switch (action.type) {
    case GET_USER_ORDERS_REQUEST:
      return { loading: true, ordersDetails: [] };
    case GET_USER_ORDERS_SUCCESS:
      return { loading: false, ordersDetails: action.payload };
    case GET_USER_ORDERS_FAIL:
      return { loading: false, ordersDetails: [], error: action.payload };
    default:
      return state;
  }
};
