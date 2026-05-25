import axios from "axios";

export let axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
});

// axiosInstance.interceptors.request.use();

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("axios instance response->", response);
    // return response;
  },
  (error) => {
    console.log("error in instance", error);
  }
);
