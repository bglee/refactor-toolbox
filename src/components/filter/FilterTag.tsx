import React from "react";
import Chip, { ChipSize } from "../common/Chip";

interface FilterTagProps {
  size?: ChipSize;
  disabled?: boolean;
  tag: string;
  term: string;
  onRemove?: () => void;
  onClick?: () => void;
  children?: React.ReactNode;
}

const FilterTag: React.FC<FilterTagProps> = ({
  tag,
  term,
  onRemove,
  onClick,
  size = "md",
  disabled = false,
  children,
}) => {
  return (
    <Chip size={size} disabled={disabled} onRemove={onRemove} onClick={onClick}>
      <span className="font-medium text-base-content/80">{tag}</span>
      <span className="px-1 text-base-content/50">:</span>
      {children ? (
        <div className="flex items-center">{children}</div>
      ) : (
        <span className="font-mono text-primary/80">{term}</span>
      )}
    </Chip>
  );
};

export default FilterTag;
