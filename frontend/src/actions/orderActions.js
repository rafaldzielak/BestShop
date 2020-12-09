import { PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "../constants/orderConstants.js";
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
    dispatch({ type: PLACE_ORDER_SUCCESS });
    localStorage.setItem("userLogin", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
