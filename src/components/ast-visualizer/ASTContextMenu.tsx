import React, { useCallback, useMemo } from "react";
import { useContextMenuStore } from "../../store/store-hooks/useContextMenuStore";
import { useHighlightStore } from "../../store/store-hooks/useHighlightStore";
import { useCodeStateStore } from "../../store/store-hooks/useCodeStateStore";
import { extractPosition } from "../../utils/ASTUtils";

export const ASTContextMenu: React.FC = () => {
  const { contextMenu, setContextMenu } = useContextMenuStore();
  const { setHighlight } = useHighlightStore();
  const { codeState } = useCodeStateStore();

  const highlightInCodePosition = useMemo(() => {
    if (!contextMenu?.astBrowserContext.node) {
      return null;
    }
    return extractPosition(contextMenu.astBrowserContext.node, codeState.content);
  }, [contextMenu, codeState]);

  React.useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setContextMenu]);

  const handleHighlight = useCallback(() => {
    // This should never happen, but just in case
    if (!contextMenu?.astBrowserContext.node || !highlightInCodePosition) {
      console.error("No position information found for this AST node.");
      setContextMenu(null);
      return;
    }

    if (!codeState.content) {
      alert("No code content available.");
      setContextMenu(null);
      return;
    }

    setHighlight(highlightInCodePosition);

    setContextMenu(null);
  }, [contextMenu, highlightInCodePosition, codeState, setHighlight, setContextMenu]);

  const handleAddToFilter = () => {
    setContextMenu(null);
  };

  return contextMenu?.astBrowserContext.node ? (
    <div
      className="fixed bg-base-200 shadow-lg rounded-lg py-1 z-50"
      style={{
        left: contextMenu?.x,
        top: contextMenu?.y,
        minWidth: "200px",
      }}
    >
      {highlightInCodePosition && (
        <button className="w-full px-4 py-2 text-left hover:bg-base-300" onClick={handleHighlight}>
          Highlight in Code
        </button>
      )}
      <button className="w-full px-4 py-2 text-left hover:bg-base-300" onClick={handleAddToFilter}>
        Add to Filter By...
      </button>
    </div>
  ) : (
    <> </>
  );
};
