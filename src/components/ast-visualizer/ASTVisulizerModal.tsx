import React from "react";
import { MaterialIcon } from "../common/MaterialIcon";
import useModalStateStore from "../../store/store-hooks/useModalStateStore";

const ASTVisulizerModal = () => {
  const { modalState, setModalState } = useModalStateStore();

  const handleClose = () => {
    setModalState({ modalKey: "" });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (modalState.modalKey !== "ast-visualizer") {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-base-100 rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[90vh] m-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <h2 className="text-xl font-semibold">AST Visualizer</h2>
          <button
            onClick={handleClose}
            className="btn btn-ghost btn-sm btn-circle hover:bg-base-200"
            aria-label="Close modal"
          >
            <MaterialIcon name="close" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 h-full overflow-auto">
          <div className="text-center text-base-content/70">
            <MaterialIcon name="code" className="text-4xl mb-4 opacity-50" />
            <p>AST Visualizer content will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ASTVisulizerModal;
