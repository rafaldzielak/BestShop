import axios from "axios";

export const axiosGet = async (url, params = {}, getLoggedUserFromStateMethod) => {
  const config = { params };
  console.log(getLoggedUserFromStateMethod);
  if (getLoggedUserFromStateMethod) {
    config.headers = { Authorization: getAuthorization(getLoggedUserFromStateMethod) };
  }
  return await axios.get(url, config);
};

export const axiosPost = async (url, data = {}, getLoggedUserFromStateMethod) => {
  const config = setConfig(getLoggedUserFromStateMethod);
  return await axios.post(url, data, config);
};

export const axiosPut = async (url, data = {}, getLoggedUserFromStateMethod) => {
  const config = setConfig(getLoggedUserFromStateMethod);
  return await axios.put(url, data, config);
};

const setConfig = (getLoggedUserFromStateMethod) => {
  const config = { headers: { "Content-Type": "application/json" } };
  if (getLoggedUserFromStateMethod) {
    config.headers.Authorization = getAuthorization(getLoggedUserFromStateMethod);
  }
  return config;
};

const getAuthorization = (getLoggedUserFromStateMethod) => {
  const {
    loginUser: { loggedUser },
  } = getLoggedUserFromStateMethod();
  return `Bearer ${loggedUser.token}`;
};
