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

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_SUCCESS:
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case CREATE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_PRODUCT_RESET:
      return { loading: false };
    default:
      return state;
  }
};

export const listProductsReducer = (state = { products: [], pagination: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { loading: true, products: [], pagination: {} };
    case GET_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload.data, pagination: action.payload.pagination };
    case GET_PRODUCTS_FAIL:
      return { loading: false, error: action.payload, pagination: {} };
    default:
      return state;
  }
};

export const listProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return { loading: true };
    case GET_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case GET_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeProductReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT_REQUEST:
      return { loading: true };
    case REMOVE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case REMOVE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { loading: true, categories: [] };
    case GET_CATEGORIES_SUCCESS:
      return { loading: false, categories: action.payload };
    case GET_CATEGORIES_FAIL:
      return { loading: false, error: action.payload, categories: [] };
    default:
      return state;
  }
};

export const getCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return { loading: true };
    case GET_CATEGORY_SUCCESS:
      return { loading: false, category: action.payload };
    case GET_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case RESET_CATEGORY:
      return { loading: false };
    default:
      return state;
  }
};

export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return { loading: true };
    case CREATE_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case CREATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
