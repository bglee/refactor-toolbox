import React from "react";
import { useContextMenuStore } from "../../store/store-hooks/useContextMenuStore";
import { useHighlightStore } from "../../store/store-hooks/useHighlightStore";
import { useSourceFileParser } from "../../store/derived-store-hooks/useSourceFileParser";
import { useCodeStateStore } from "../../store/store-hooks/useCodeStateStore";
import { extractPosition } from "../../utils/ASTUtils";

export const ASTContextMenu: React.FC = () => {
  const { contextMenu, setContextMenu } = useContextMenuStore();
  const { setHighlight } = useHighlightStore();
  const { codeState } = useCodeStateStore();

  React.useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setContextMenu]);

  const handleHighlight = () => {
    if (!contextMenu?.node) {
      setContextMenu(null);
      return;
    }

    if (!codeState.content) {
      alert("No code content available.");
      setContextMenu(null);
      return;
    }

    // Extract position information directly from the node
    const position = extractPosition(contextMenu.node, codeState.content);

    if (position) {
      setHighlight(position);
    } else {
      alert("No position information found for this AST node.");
      setHighlight(null);
    }

    setContextMenu(null);
  };

  const handleAddToFilter = () => {
    setContextMenu(null);
  };

  return contextMenu?.node ? (
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
