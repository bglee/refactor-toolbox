import { useEffect } from "react";
import { RetireveFromBinding } from ".";
import { Store } from "@tanstack/react-store";


type UseBindStoreProps<T> = {
    defaultState: T;
    store: Store<T>;
    bindings: RetireveFromBinding<T>[];
}

/**
 * Retrives the state from the bindings.
 * @param retrivials - The retrivials to use.
 * @returns A function to retireve the state from the bindings.
 */
export const useBindStore = <T>({defaultState, store, bindings}: UseBindStoreProps<T>)=>{
    //Retrive the state from the bindings.
    useEffect(()=>{
        let stateToSet = defaultState;
        for (const retrival of bindings) {
            const state = retrival<T>();
            if (state) {
                stateToSet = state;
                break;
            }
        }
        store.setState(stateToSet);
    },[bindings]);
}