import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { clearToken } from "./authHeaderServices";

const baseURL = "http://localhost:5000";

let authTokens = localStorage.getItem("user_data")
  ? JSON.parse(localStorage.getItem("user_data"))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * handling all requests for contact
 */
axiosInstance.interceptors.request.use(
  (req) => {
    const authTokens = localStorage.getItem("user_data")
      ? JSON.parse(localStorage.getItem("user_data"))
      : null;
    if (authTokens) {
      // for Node.js Express back-end
      req.headers.Authorization = "Bearer " + authTokens.accessToken;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * handling response for contact modal crud operations
 */
const responseSuccessHandler = (response) => {
  let user = JSON.parse(localStorage.getItem("user_data"));
  user.accessToken = response.data.accessToken;
  localStorage.setItem("user_data", JSON.stringify(user));
  response.headers.Authorization = "Bearer " + user.accessToken;
  return response;
};

const responseErrorHandler = (error) => {
  if (error.response.status === 401) {
    clearToken();
    window.location = "/login";
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    //decode the jwt and check if the token is expired or not
    const user = jwt_decode(authTokens.accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (isExpired || err.response.status === 403) {
      try {
        const authTokens = (await localStorage.getItem("user_data"))
          ? JSON.parse(await localStorage.getItem("user_data"))
          : null;

        const response = await axios.post(baseURL + "refreshtoken/", {
          refreshToken: authTokens.refreshToken,
        });
        if (response.status === 200) {
          responseSuccessHandler(response);
        }
      } catch (error) {
        responseErrorHandler(error);
      }
    }
  }
);
export default axiosInstance;
