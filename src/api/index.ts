import axios from "axios";
import { setInterceptors } from "@/api/common/interceptors";

function createAxiosInstance() {
  return axios.create({
    baseURL: "http://localhost:3000/",
  });
}
// 액시오스 초기화 함수
function createInstanceWithAuth(url: string) {
  const instance = axios.create({
    baseURL: `http://localhost:3000/${url}`,
  });
  return setInterceptors(instance);
}

export const instance = createAxiosInstance();
export const posts = createInstanceWithAuth("posts");
