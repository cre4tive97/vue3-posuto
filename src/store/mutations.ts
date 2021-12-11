export enum MutationTypes {
  setUserToken = "setUserToken",
  setUserNickname = "setUserNickname",
  clearToken = "clearToken",
  clearNickname = "clearNickname",
  setPostColor = "setPostColor",
  setPostEmptyStatus = "setPostEmptyStatus",
}

import { RootState } from "./state";

export enum MutationsType {
  setUserToken = "setUserToken",
  setUserNickname = "setUserNickname",
  clearToken = "clearToken",
  clearNickname = "clearNickname",
  setPostColor = "setPostColor",
  setPostEmptyStatus = "setPostEmptyStatus",
}

export const mutations = {
  [MutationsType.setUserToken](state: RootState, token: string): void {
    state.token = token;
  },
  [MutationsType.setUserNickname](state: RootState, nickname: string): void {
    state.nickname = nickname;
  },
  [MutationsType.clearToken](state: RootState): void {
    state.token = "";
  },
  [MutationsType.clearNickname](state: RootState): void {
    state.nickname = "";
  },
  [MutationsType.setPostColor](state: RootState, color: string): void {
    state.postColor = color;
  },
  [MutationsType.setPostEmptyStatus](state: RootState, isEmpty: boolean): void {
    state.postEmptyStatus = isEmpty;
  },
};

export type Mutations = typeof mutations;
