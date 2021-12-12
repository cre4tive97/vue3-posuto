import { saveAuthToCookie, saveUserToCookie } from "@/utils/cookies";
import { loginUser } from "@/api/auth";
import { Mutations, MutationTypes } from "./mutations";
import { ActionContext, ActionTree } from "vuex";
import { State } from "./state";
import { LoginType } from "@/types/types";

export enum ActionTypes {
  LOGIN_USER = "LOGIN_USER",
  GET_POSTCOLOR = "GET_POSTCOLOR",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    Key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [ActionTypes.LOGIN_USER](
    { commit }: AugmentedActionContext,
    payload: LoginType
  ): void;
  [ActionTypes.GET_POSTCOLOR]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.LOGIN_USER]({ commit }, userData) {
    const response = await loginUser(userData);
    commit(MutationTypes.SET_USER_TOKEN, response.data.token);
    commit(MutationTypes.SET_USER_NICKNAME, response.data.user.nickname);
    saveAuthToCookie(response.data.token);
    saveUserToCookie(response.data.user.nickname);
  },
  [ActionTypes.GET_POSTCOLOR]({ commit }): void {
    const color = localStorage.getItem("post_color");
    if (typeof color === "string") commit(MutationTypes.SET_POST_COLOR, color);
  },
};
