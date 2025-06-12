import { Store } from "@tanstack/react-store";
import { RetireveFromBinding } from ".";
import { useEffect } from "react";

export const useDOMAttributeBinding = <T>(store: Store<T>, key: string): RetireveFromBinding => {
    useEffect(()=>{
        const unsubscribe = store.subscribe(()=>{
            document.documentElement.setAttribute(key, String(store.state));
        });
        return () => unsubscribe();
    },[store]);

    //Never twoway bindng
    return () => undefined;
}