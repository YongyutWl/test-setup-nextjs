import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["TestReq"] = "request";
  return config;
});

axiosInstance.interceptors.response.use((response) => {
  response.headers["TestRes"] = "response";
  return response;
});

export default axiosInstance;
