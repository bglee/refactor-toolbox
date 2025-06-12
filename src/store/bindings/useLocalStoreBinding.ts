import { Store } from "@tanstack/react-store";
import { useCallback, useEffect } from "react";
import { RetireveFromBinding } from ".";

/**
 * Binds a store to local storage.
 * @param store - The store to bind.
 * @param key - The key to use for the local storage.
 * @returns A function to retireve the state from the local storage.
 */
export const useBindToLocalStore = <T>(store: Store<T>, key: string): RetireveFromBinding => {

 //Subscribe to the store and update the local storage when the store changes.
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      localStorage.setItem(key, JSON.stringify(store.state));
    });
    return () => unsubscribe();
  }, [store.state]);

  //Retireve the state from the local storage.
  const retireveFromBiding = useCallback(() => {
    const storedState = localStorage.getItem(key);
    return storedState ? JSON.parse(storedState) : undefined;
  }, [key, store]);  

  return retireveFromBiding;
};