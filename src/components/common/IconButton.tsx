import React from "react";
import { MaterialIcon } from "./MaterialIcon";

interface IconButtonProps {
  name: string;
  title?: string;
  onClick?: () => void;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ name, title, onClick, className = "" }) => {
  return (
    <button
      type="button"
      title={title}
      aria-label={title || name}
      onClick={onClick}
      className={`btn btn-ghost btn-circle ${className}`}
    >
      <MaterialIcon name={name} />
    </button>
  );
};

export default IconButton;
