import { useStore } from "@tanstack/react-store";
import { HighlightState } from "../../model/CodeState";
import { highlightStore } from "../store";

export const useHighlightStore = () => {
  return {
    highlight: useStore(highlightStore, (state: HighlightState | null) => state),
    setHighlight: (highlight: HighlightState | null) => highlightStore.setState(() => highlight),
  } as const;
};
