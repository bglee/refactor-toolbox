import { useEffect } from "react";
import { RetireveFromBinding } from ".";
import { Store } from "@tanstack/react-store";

/**
 * Retrives the state from the bindings.
 * @param retrivials - The retrivials to use.
 * @returns A function to retireve the state from the bindings.
 */
export const useBindStore = <T>(defaultState: T, store: Store<T>, ...retrivials: RetireveFromBinding[] )=>{
    //Retrive the state from the bindings.
    useEffect(()=>{
        let stateToSet = defaultState;
        for (const retrival of retrivials) {
            const state = retrival<T>();
            if (state) {
                stateToSet = state;
                break;
            }
        }
        store.setState(stateToSet);
    },[retrivials]);
}