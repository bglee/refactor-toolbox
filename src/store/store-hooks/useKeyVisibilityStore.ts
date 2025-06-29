import { DEFAULT_KEY_VISIBILITY, keyVisibilityStore } from "../store";
import { useEffect, useState } from "react";

export const useKeyVisibilityStore = () => {
  const [keyVisibility, setKeyVisibility] = useState(DEFAULT_KEY_VISIBILITY);

  useEffect(() => {
    const unsubscribe = keyVisibilityStore.subscribe(() => {
      setKeyVisibility(keyVisibilityStore.state);
    });
    return () => unsubscribe();
  }, []);

  return {
    keyVisibility,
    setKeyVisibility: (keys: string[]) => keyVisibilityStore.setState(() => keys),
  } as const;
};
