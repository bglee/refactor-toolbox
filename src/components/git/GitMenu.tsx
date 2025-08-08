import { useState } from "react";
import { useEffect, useRef } from "react";
import { MaterialIcon } from "../common/MaterialIcon";
import { IconButton } from "../common/IconButton";

export const GitMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="flex items-center relative">
      <IconButton name="polyline" title="Git" onClick={() => setOpen(!open)} />

      {open && (
        <div
          ref={popoverRef}
          className="bg-base-100 border border-base-300 p-3 rounded-xl shadow-md z-20 absolute top-full right-0 mt-2 w-[40vw] max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-base-400 scrollbar-track-base-200"
        ></div>
      )}
    </div>
  );
};
