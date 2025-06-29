import React from "react";
import { useContextMenuStore } from "../../store/store-hooks/useContextMenuStore";

export const ASTContextMenu: React.FC = () => {
  const { contextMenu, setContextMenu } = useContextMenuStore();
  React.useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setContextMenu]);

  const handleHighlight = () => {
    console.log("Highlight node:", contextMenu?.nodeId);
    setContextMenu(null);
  };

  const handleAddToFilter = () => {
    console.log("Add to filter:", contextMenu?.nodeId);
    setContextMenu(null);
  };

  return contextMenu?.nodeId ? (
    <div
      className="fixed bg-base-200 shadow-lg rounded-lg py-1 z-50"
      style={{
        left: contextMenu?.x,
        top: contextMenu?.y,
        minWidth: "200px",
      }}
    >
      <button className="w-full px-4 py-2 text-left hover:bg-base-300" onClick={handleHighlight}>
        Highlight in Code
      </button>
      <button className="w-full px-4 py-2 text-left hover:bg-base-300" onClick={handleAddToFilter}>
        Add to Filter By...
      </button>
    </div>
  ) : (
    <> </>
  );
};
