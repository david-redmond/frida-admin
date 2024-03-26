import axios from "axios";

const http = axios.create({
  baseURL:
    process.env.REACT_APP_GATEWAY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the AUTH token for any request
http.interceptors.request.use(function (config) {
  let authHeader: string;
  const tokenString: string | null = sessionStorage.getItem("token");
  if (!!tokenString) {
    const userToken = JSON.parse(tokenString);
    authHeader = userToken?.token;
  }
  // @ts-ignore
  config.headers.Authorization = !!authHeader ? authHeader : "";
  return config;
});
export default http;
