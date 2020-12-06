import {
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../constants/userConstants";

export const loginUserReducer = (state = { loggedUser: null }, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { loading: true, loggedUser: null };
    case LOGIN_USER_SUCCESS:
      return { loading: false, loggedUser: action.payload };
    case LOGIN_USER_FAIL:
      return { loading: false, error: action.payload, loggedUser: null };
    case LOGOUT_USER:
      return { loading: false, loggedUser: null };
    default:
      return state;
  }
};

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true };
    case REGISTER_USER_SUCCESS:
      return { loading: false, success: true };
    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
