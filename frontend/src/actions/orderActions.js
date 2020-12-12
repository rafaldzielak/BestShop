import {
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_RESET,
  PLACE_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_USER_ORDERS_FAIL,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
} from "../constants/orderConstants.js";
import axios from "axios";

export const placeOrderAction = (orderDetails) => async (dispatch, getState) => {
  const {
    loginUser: { loggedUser },
  } = getState();
  try {
    dispatch({ type: PLACE_ORDER_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${loggedUser.token}` },
    };
    const { data } = await axios.post("/api/orders", orderDetails, config);
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getOrderAction = (orderId) => async (dispatch, getState) => {
  const {
    loginUser: { loggedUser },
  } = getState();
  try {
    dispatch({ type: GET_ORDER_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${loggedUser.token}` },
    };
    const { data } = await axios.get(`/api/orders/${orderId}`, config);
    dispatch({ type: GET_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getUserOrdersAction = () => async (dispatch, getState) => {
  const {
    loginUser: { loggedUser },
  } = getState();
  try {
    dispatch({ type: GET_USER_ORDERS_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${loggedUser.token}` },
    };
    const { data } = await axios.get(`/api/auth/orders/`, config);
    dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const placeOrderReset = () => (dispatch) => {
  dispatch({ type: PLACE_ORDER_RESET });
};
