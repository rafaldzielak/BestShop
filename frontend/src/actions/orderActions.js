import {
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_RESET,
  PLACE_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  GET_USER_ORDERS_FAIL,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
} from "../constants/orderConstants.js";
import { cleanCartAction } from "./cartActions.js";
import { axiosGet, axiosPost, axiosPut } from "./utils";

export const placeOrderAction = (orderDetails) => async (dispatch, getState) => {
  dispatch({ type: PLACE_ORDER_REQUEST });
  try {
    const { data } = await axiosPost("/api/orders", orderDetails, getState);
    dispatch(cleanCartAction());
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getOrderAction = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });
    const { data } = await axiosGet(`/api/orders/${orderId}`, {}, getState);
    dispatch({ type: GET_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateOrderAction = (orderId, fieldsToUpdate) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const { data } = await axiosPut(`/api/orders/${orderId}`, fieldsToUpdate, getState);
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getAllOrdersAction = ({
  userId = "",
  notPaidOnly = false,
  notSentOnly = false,
  notDeliveredOnly = false,
  startDate,
  endDate,
  keyword,
}) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_ORDERS_REQUEST });
    const params = {
      startDate,
      endDate,
      keyword,
      user: userId,
      notpaid: notPaidOnly,
      notsent: notSentOnly,
      notdelivered: notDeliveredOnly,
    };
    const { data } = await axiosGet("/api/orders", params, getState);
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const payOrderViaPaypalAction = (orderId, paypalOrderId, create_time) => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await axiosPut(
      `/api/orders/${orderId}/pay/paypal`,
      { paypalOrderId, create_time },
      getState
    );
    dispatch({ type: GET_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getUserOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_ORDERS_REQUEST });
    const { data } = await axiosGet("/api/auth/orders", {}, getState);
    dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const reviewProductAction = (productId, orderId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_REVIEW_REQUEST });
    const { data } = await axiosPut(`/api/products/${productId}/order/${orderId}/review`, review, getState);
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
    dispatch(getOrderAction(orderId));
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const placeOrderReset = () => (dispatch) => {
  dispatch({ type: PLACE_ORDER_RESET });
};
