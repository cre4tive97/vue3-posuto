import { store } from "@/store/index";
import { AxiosInstance, AxiosError } from "axios";

export function setInterceptors(instance: AxiosInstance): AxiosInstance {
  instance.interceptors.request.use(
    function (config) {
      if (config.headers) config.headers.Authorization = store.state?.token;
      return config;
    },
    function (error: AxiosError) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return instance;
}
