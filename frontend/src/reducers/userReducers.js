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

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_PROFILE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return { loading: true };
    case GET_ALL_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case GET_ALL_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
