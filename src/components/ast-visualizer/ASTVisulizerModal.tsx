import React, { useEffect } from "react";
import { MaterialIcon } from "../common/MaterialIcon";
import useModalStateStore from "../../store/store-hooks/useModalStateStore";
import FilterTag from "../filter/FilterTag";
import { useFilterStore } from "../../store/store-hooks/useFilterStore";

const ASTVisulizerModal = () => {
  const { modalState, setModalState } = useModalStateStore();
  const { filter, setFilter } = useFilterStore();

  const handleClose = () => {
    setModalState(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleAddToFilter = (key: string, value: string) => {
    setFilter({ tags: [...filter.tags, { tag: key, term: value }] });
  };

  return modalState?.modalKey === "ast-visualizer" ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-base-100 border border-base-300 rounded-xl shadow-2xl w-3/4 max-w-4xl h-full max-h-[40vh] m-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <h2 className="text-xl font-semibold">Add to Filter</h2>
          <button
            onClick={handleClose}
            className="btn btn-ghost btn-sm btn-circle hover:bg-base-200"
            aria-label="Close modal"
          >
            <MaterialIcon name="close" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 h-full overflow-y-scroll">
          <div className="text-center text-base-content/70 flex flex-col gap-2 justify-center items-center">
            <div className="w-1/4">
              {Object.entries(modalState?.astBrowserContext.node).map(([key, value]) =>
                typeof value === "string" ||
                typeof value === "number" ||
                typeof value === "boolean" ? (
                  <div key={key} className="p-2">
                    <FilterTag
                      tag={key}
                      term={value.toString()}
                      size="lg"
                      disabled={filter.tags.some((tag) => tag.tag === key)}
                      onClick={() => handleAddToFilter(key, value.toString())}
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ASTVisulizerModal;
