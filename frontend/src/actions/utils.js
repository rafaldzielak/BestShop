import axios from "axios";

export const axiosGet = async (url, params = {}, getLoggedUserFromStateMethod) => {
  const config = { params };
  console.log(getLoggedUserFromStateMethod);
  if (getLoggedUserFromStateMethod) {
    config.headers = { Authorization: setAuthorization(getLoggedUserFromStateMethod) };
  }
  return await axios.get(url, config);
};

export const axiosPost = async (url, data = {}, getLoggedUserFromStateMethod) => {
  const config = setConfigWithOptionalAuthorization(getLoggedUserFromStateMethod);
  return await axios.post(url, data, config);
};

export const axiosPut = async (url, data = {}, getLoggedUserFromStateMethod) => {
  const config = setConfigWithOptionalAuthorization(getLoggedUserFromStateMethod);
  console.log(config);
  return await axios.put(url, data, config);
};

export const axiosDelete = async (url, getLoggedUserFromStateMethod) => {
  const config = setConfigWithOptionalAuthorization(getLoggedUserFromStateMethod);
  return await axios.delete(url, config);
};

const setConfigWithOptionalAuthorization = (getLoggedUserFromStateMethod) => {
  const config = setConfig();
  console.log(config);
  if (getLoggedUserFromStateMethod) {
    config.headers.Authorization = setAuthorization(getLoggedUserFromStateMethod);
  }
  return config;
};

const setConfig = () => {
  const config = { headers: { "Content-Type": "application/json" } };
  return config;
};

const setAuthorization = (getLoggedUserFromStateMethod) => {
  const {
    loginUser: { loggedUser },
  } = getLoggedUserFromStateMethod();
  return `Bearer ${loggedUser.token}`;
};
