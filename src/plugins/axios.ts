import axios from "axios";
import { BASE_URL, localKey, pathNames } from "../constants";
import {
  getObjectLocalData,
  getStringLocalData,
  removeLocalItem,
} from "../utils";

export const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (conf) => {
    const token = getStringLocalData(localKey.TOKEN) || "";
    if (token) {
      conf.headers.Authorization = `Bearer ${token}`;
    }
    return conf;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response?.status === 401 || error.response?.status === 403) {
      removeLocalItem(localKey.TOKEN);
      window.location.replace(pathNames.login);
      return;
    }
    if (error?.code === "ERR_NETWORK") {
      // window.location.replace(pathNames.ERROR)
    }
    return error.response?.data;
  }
);
