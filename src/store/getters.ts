import { State } from "@/store/state";

export const getters = {
  isLogin(state: State): boolean {
    return state.nickname !== "";
  },
};

export type Getters = typeof getters;
