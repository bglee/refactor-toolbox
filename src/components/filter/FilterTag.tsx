interface FilterTagProps {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  key: string;
  tag: string;
  term: string;
  onRemove?: () => void;
  onClick?: () => void;
}

const FilterTag = ({
  key,
  tag,
  term,
  onRemove,
  size = "md",
  disabled = false,
  onClick,
}: FilterTagProps) => {
  return (
    <div
      className={`badge whitespace-nowrap rounded-md p-2 shadow-sm shadow-primary/40 h-6 mr-3 flex items-center justify-center ${size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-lg"} ${disabled ? "opacity-50" : ""} ${onClick ? "cursor-pointer" : ""}`}
      key={key}
      onClick={onClick}
    >
      {onRemove ? (
        <div
          className="cursor-pointer text-[14px] flex items-center justify-center mr-2 font-bold font-mono text-primary/50"
          onClick={onRemove}
        >
          x
        </div>
      ) : null}

      <span className="">{`${tag} : `}</span>
      <span className="text-primary/80 pl-1">{term}</span>
    </div>
  );
};

export default FilterTag;
