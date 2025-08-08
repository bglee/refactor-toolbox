import React from "react";
import { MaterialIcon } from "./MaterialIcon";

export type ChipSize = "sm" | "md" | "lg";

interface ChipProps {
  size?: ChipSize;
  disabled?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const sizeClassMap: Record<ChipSize, string> = {
  sm: "text-xs h-7 px-2 py-0.5 gap-1",
  md: "text-sm h-8 px-2.5 py-1 gap-1.5",
  lg: "text-base h-9 px-3 py-1.5 gap-2",
};

export const Chip: React.FC<ChipProps> = ({
  size = "md",
  disabled = false,
  onRemove,
  onClick,
  className = "",
  children,
}) => {
  const interactiveClasses = onClick
    ? "cursor-pointer hover:border-primary/50 hover:bg-primary/5"
    : "";
  const disabledClasses = disabled ? "opacity-60 pointer-events-none" : "";
  const containerClasses = `inline-flex items-center rounded-lg border border-base-300 bg-base-200/70 ${
    sizeClassMap[size]
  } ${interactiveClasses} ${disabledClasses} ${className}`;

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={containerClasses}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onClick={onClick}
    >
      {onRemove ? (
        <button
          type="button"
          className="-ml-0.5 mr-1 inline-flex items-center justify-center rounded-md text-base-content/60 hover:text-base-content focus:outline-none focus:ring-2 focus:ring-primary/30"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <MaterialIcon name="close" className="text-sm" />
        </button>
      ) : null}

      {children}
    </div>
  );
};

export default Chip;
