import { State } from "@/store/state";
import { GetterTree } from "vuex";

export type Getters = {
  isLogin(state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  isLogin(state) {
    return state.nickname !== "";
  },
};
