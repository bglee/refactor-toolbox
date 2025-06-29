import { CodeState } from "../../model/CodeState";
import { DEFAULT_CODE_STATE, codeStateStore } from "../store";
import { useEffect, useState } from "react";

export const useCodeStateStore = () => {
  const [codeState, setCodeState] = useState(DEFAULT_CODE_STATE);

  useEffect(() => {
    const unsubscribe = codeStateStore.subscribe(() => {
      setCodeState(codeStateStore.state);
    });
    return () => unsubscribe();
  }, []);

  return {
    codeState,
    setCodeState: (state: CodeState) => codeStateStore.setState(() => state),
  } as const;
};
