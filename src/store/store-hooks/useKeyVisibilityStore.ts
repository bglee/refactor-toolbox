import { useStore } from "@tanstack/react-store";
import { keyVisibilityStore } from "../store";

export const useKeyVisibilityStore = () => {
  return {
    keyVisibility: useStore(keyVisibilityStore, (state: string[]) => state),
    setKeyVisibility: (keys: string[]) => keyVisibilityStore.setState(() => keys),
  } as const;
};
