import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
} from "../constants/productContants";
import axios from "axios";

export const getProducts = (keyword = "", sort = "") => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    const { data } = await axios.get(`/api/products/?keyword=${keyword}&sort=${sort}`);
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
