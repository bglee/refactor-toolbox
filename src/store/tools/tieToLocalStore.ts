import { Store } from "@tanstack/react-store";

export const tieToLocalStore = <T>(store: Store<T>, key: string) => {
  store.subscribe(() => {
    localStorage.setItem(key, JSON.stringify(store.state));
  });
};
