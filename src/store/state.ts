import { getAuthFromCookie, getUserFromCookie } from "@/utils/cookies";

export interface State {
  token: string;
  nickname: string;
  postColor: string;
  postEmptyStatus: boolean;
}

export const state: State = {
  token: getAuthFromCookie() || "",
  nickname: getUserFromCookie() || "",
  postColor: "#FEC0CA",
  postEmptyStatus: false,
};
