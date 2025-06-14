import { DEFAULT_FILTER, filterStore } from "../store";
import { useEffect, useState } from "react";
import { Filter } from "../../model/filter";

export const useFilterStore = () => {

    const [filter, setFilter] = useState(DEFAULT_FILTER);

    useEffect(()=>{
        const unsubscribe = filterStore.subscribe(()=>{
            setFilter(filterStore.state);
        });
        return () => unsubscribe();
    },[]);

    return {filter, setFilter: (filter: Filter<string>)=>filterStore.setState(()=>filter)} as const;
}