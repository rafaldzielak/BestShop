import {
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/auth/login", { email, password }, config);
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    localStorage.setItem("userLogin", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const registerAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/auth/register", { name, email, password }, config);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    localStorage.setItem("userLogin", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateProfileAction = (name = "", password = "") => async (dispatch, getState) => {
  const {
    loginUser: { loggedUser },
  } = getState();
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${loggedUser.token}` },
    };
    const { data } = await axios.put("/api/auth/profile", { name, password }, config);
    dispatch({ type: UPDATE_PROFILE_SUCCESS });
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    localStorage.setItem("userLogin", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getAllUsersAction = (keyword = "") => async (dispatch, getState) => {
  const {
    loginUser: { loggedUser },
  } = getState();
  const options = { keyword };
  try {
    dispatch({ type: GET_ALL_USERS_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${loggedUser.token}` },
    };
    const { data } = await axios.get(`/api/auth/users?keyword=${keyword}`, config);
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logoutAction = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  localStorage.removeItem("userLogin");
};
