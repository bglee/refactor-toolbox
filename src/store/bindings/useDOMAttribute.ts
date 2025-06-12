import { Store } from "@tanstack/react-store";
import { RetireveFromBinding } from ".";
import { useEffect } from "react";

export const useDOMAttribute = <T>(store: Store<T>, key: string): RetireveFromBinding<T> => {
    useEffect(()=>{
        const unsubscribe = store.subscribe(()=>{
            document.documentElement.setAttribute(key, String(store.state));
        });
        return () => unsubscribe();
    },[store]);

    //Never twoway bindng
    return () => undefined;
}