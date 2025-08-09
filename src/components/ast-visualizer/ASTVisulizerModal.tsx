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

  if (modalState?.modalKey !== "ast-visualizer") return null;

  const labelId = "ast-visualizer-title";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-base-300/40 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="w-full max-w-4xl bg-base-100 border border-base-300 rounded-2xl shadow-xl overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 border-b border-base-300">
          <h2 id={labelId} className="text-xl font-semibold">
            Add to Filter
          </h2>
          <button
            onClick={handleClose}
            className="btn btn-ghost btn-sm btn-circle hover:bg-base-200"
            aria-label="Close modal"
          >
            <MaterialIcon name="close" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-auto px-4 py-4 sm:px-6 sm:py-6">
          <div className="text-base-content/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(modalState?.astBrowserContext?.node ?? {}).map(([key, value]) => {
                const isPrimitive =
                  typeof value === "string" ||
                  typeof value === "number" ||
                  typeof value === "boolean";
                if (!isPrimitive) return null;
                const term = value.toString();
                const disabled = filter.tags.some((t) => t.tag === key);
                return (
                  <div key={key} className="">
                    <FilterTag
                      tag={key}
                      term={term}
                      size="md"
                      disabled={disabled}
                      onClick={() => !disabled && handleAddToFilter(key, term)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ASTVisulizerModal;
