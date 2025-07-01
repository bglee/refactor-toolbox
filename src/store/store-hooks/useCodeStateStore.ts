import { useStore } from "@tanstack/react-store";
import { CodeState } from "../../model/CodeState";
import { codeStateStore } from "../store";

export const useCodeStateStore = () => {
  return {
    codeState: useStore(codeStateStore, (state: CodeState) => state),
    setCodeState: (state: CodeState) => codeStateStore.setState(() => state),
  };
};
