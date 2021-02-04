import axios from "axios";
export const axiosGet = async (url, params = {}, getLoggedUserFromStateMethod) => {
  const config = { params };
  if (getLoggedUserFromStateMethod) {
    const {
      loginUser: { loggedUser },
    } = getLoggedUserFromStateMethod();
    config.headers = { Authorization: `Bearer ${loggedUser.token}` };
  }
  return await axios.get(url, config);
};
