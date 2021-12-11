import { instance } from "@/api/index";
import {
  LoginSuccess,
  LoginType,
  SignupSuccess,
  SignUpType,
} from "@/types/types";
import { AxiosPromise } from "axios";

// 회원가입
function registerUser(userData: SignUpType): AxiosPromise<SignupSuccess> {
  return instance.post("signup", userData);
}

// 로그인
function loginUser(userData: LoginType): AxiosPromise<LoginSuccess> {
  return instance.post("login", userData);
}

export { registerUser, loginUser };
