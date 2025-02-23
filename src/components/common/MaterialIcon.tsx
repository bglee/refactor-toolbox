import React from "react";

interface MaterialIconProps {
  name: string;
  className?: string;
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  className = "",
}) => <span className={`material-symbols-sharp ${className}`}>{name}</span>;
