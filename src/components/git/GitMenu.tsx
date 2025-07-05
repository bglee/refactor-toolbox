import { useState } from "react";
import { useEffect, useRef } from "react";
import { MaterialIcon } from "../common/MaterialIcon";

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex items-center relative">
      <button ref={triggerRef} onClick={() => setOpen(!open)} className="btn btn-ghost btn-circle">
        <MaterialIcon name="polyline" />
      </button>

      {open && (
        <div
          ref={popoverRef}
          className="bg-base-200 border border-base-300 p-2 rounded z-10 absolute top-full right-0 mt-1 w-[40vw]"
        ></div>
      )}
    </div>
  );
};
