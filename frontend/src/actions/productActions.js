import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAIL,
  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  RESET_CATEGORY,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
} from "../constants/productContants";
import axios from "axios";

export const getProducts = (productDetails) => async (dispatch) => {
  const keyword = productDetails.keyword || "";
  const sort = productDetails.sort || "";
  const hidden = productDetails.hidden || false;
  const category = productDetails.category || "";
  const page = productDetails.page || 1;
  const limit = productDetails.limit || 12;
  console.log(page);
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    const { data } = await axios.get(
      `/api/products/?keyword=${keyword}&sort=${sort}&hidden=${hidden}&category=${category}&page=${page}&limit=${limit}`
    );
    console.log(data);
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createProductAction = (product) => async (dispatch, getState) => {
  const {
    loginUser: { loggedUser },
  } = getState();
  const config = {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${loggedUser.token}` },
  };
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const { data } = await axios.post(`/api/products/`, product, config);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateProductAction = (id, product) => async (dispatch, getState) => {
  const {
    loginUser: { loggedUser },
  } = getState();
  const config = {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${loggedUser.token}` },
  };
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const { data } = await axios.put(`/api/products/${id}`, product, config);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const removeProductAction = (id) => async (dispatch, getState) => {
  const {
    loginUser: { loggedUser },
  } = getState();
  const config = {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${loggedUser.token}` },
  };
  try {
    dispatch({ type: REMOVE_PRODUCT_REQUEST });
    const { data } = await axios.delete(`/api/products/${id}`, config);
    dispatch({ type: REMOVE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REMOVE_PRODUCT_FAIL,
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

export const updateProductResetAction = () => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_RESET });
};

export const getCategoriesAction = (id = "") => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    const { data } = await axios.get("/api/products/categories?level=0");
    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getCategoryAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });
    const { data } = await axios.get(`/api/products/categories/${id}`);
    dispatch({ type: GET_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createCategoryAction = (categoryDetails) => async (dispatch, getState) => {
  const {
    loginUser: { loggedUser },
  } = getState();
  const config = {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${loggedUser.token}` },
  };
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    const { data } = await axios.post(`/api/products/categories/`, categoryDetails, config);
    dispatch({ type: CREATE_CATEGORY_SUCCESS });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const resetCategoryAction = () => (dispatch) => {
  dispatch({ type: RESET_CATEGORY });
};
