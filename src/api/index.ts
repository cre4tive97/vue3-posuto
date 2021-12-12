import axios from "axios";
import { setInterceptors } from "@/api/common/interceptors";

function createAxiosInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}
// 액시오스 초기화 함수
function createInstanceWithAuth(url: string) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });
  return setInterceptors(instance);
}

export const instance = createAxiosInstance();
export const posts = createInstanceWithAuth("posts");
