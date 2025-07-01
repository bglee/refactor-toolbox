import { contextMenuStore } from "../store";
import { ContextMenuState } from "../../model/ContextMenuState";
import { useStore } from "@tanstack/react-store";

export const useContextMenuStore = () => {
  return {
    contextMenu: useStore(contextMenuStore, (state: ContextMenuState | null) => state),
    setContextMenu: (menu: ContextMenuState | null) => contextMenuStore.setState(() => menu),
  };
};
