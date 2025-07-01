import { filterStore } from "../store";
import { Filter } from "../../model/filter";
import { useStore } from "@tanstack/react-store";

export const useFilterStore = () => {
  return {
    filter: useStore(filterStore, (state: Filter<string>) => state),
    setFilter: (filter: Filter<string>) => filterStore.setState(() => filter),
  } as const;
};
