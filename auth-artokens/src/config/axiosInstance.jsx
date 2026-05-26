import axios from "axios";

export let axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    let originalReq = error.config;

    if (error.response.status === 401 || !originalReq.retry) {
      originalReq.retry = true;


      try {
        await axiosInstance.get("/api/auth/get-accessToken");
        return axiosInstance(originalReq);
      } catch (error) {
        window.location.href = "/";
        return Promise.reject(error);
      }
    }
  }
);
