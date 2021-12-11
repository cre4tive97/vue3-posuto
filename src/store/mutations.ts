import { State } from "@/store/state";
import { MutationTree } from "vuex";

export enum MutationTypes {
  SET_USER_TOKEN = "SET_USER_TOKEN",
  SET_USER_NICKNAME = "SET_USER_NICKNAME",
  CLEAR_TOKEN = "CLEAR_TOKEN",
  CLEAR_NICKNAME = "CLEAR_NICKNAME",
  SET_POST_COLOR = "SET_POST_COLOR",
  SET_POST_EMPTY_STATUS = "SET_POST_EMPTY_STATUS",
}

export type Mutations<S = State> = {
  [MutationTypes.SET_USER_TOKEN](state: S, token: string): void;
  [MutationTypes.SET_USER_NICKNAME](state: State, nickname: string): void;
  [MutationTypes.CLEAR_TOKEN](state: State): void;
  [MutationTypes.CLEAR_NICKNAME](state: State): void;
  [MutationTypes.SET_POST_COLOR](state: State, color: string): void;
  [MutationTypes.SET_POST_EMPTY_STATUS](state: State, isEmpty: boolean): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_USER_TOKEN](state, token): void {
    state.token = token;
  },
  [MutationTypes.SET_USER_NICKNAME](state, nickname): void {
    state.nickname = nickname;
  },
  [MutationTypes.CLEAR_TOKEN](state): void {
    state.token = "";
  },
  [MutationTypes.CLEAR_NICKNAME](state): void {
    state.nickname = "";
  },
  [MutationTypes.SET_POST_COLOR](state, color): void {
    state.postColor = color;
  },
  [MutationTypes.SET_POST_EMPTY_STATUS](state, isEmpty): void {
    state.postEmptyStatus = isEmpty;
  },
};
