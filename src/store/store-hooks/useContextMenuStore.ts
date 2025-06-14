import { contextMenuStore } from "../store";
import { ContextMenuState } from "../../model/ContextMenuState";
import { useEffect, useState } from "react";

export const useContextMenuStore = () => {
    const [contextMenu, setContextMenu] = useState(contextMenuStore.state);

    useEffect(() => {
        const unsubscribe = contextMenuStore.subscribe(() => {
            setContextMenu(contextMenuStore.state);
        });
        return () => unsubscribe();
    }, []);
  return {
    contextMenu,
    setContextMenu: (menu: ContextMenuState | null) => contextMenuStore.setState(() => menu),
  };
}; 