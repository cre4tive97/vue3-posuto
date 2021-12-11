import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { State, state } from "@/store/state";
import { Getters, getters } from "@/store/getters";

export interface Getters {
  isLogin: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state,
  getters,
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}
