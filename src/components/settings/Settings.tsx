import React, { useRef, useEffect, useState } from "react";
import { MaterialIcon } from "../common/MaterialIcon";
import { useThemeStore } from "../../store/store-hooks/useThemeStore";
import { AppTheme, codeBlockThemeMap } from "../../config/theming";

export const Settings: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { theme: currentTheme, setTheme } = useThemeStore();

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
        <MaterialIcon name="settings" />
      </button>
      {open && (
        <div
          ref={popoverRef}
          className="bg-neutral border border-primary p-2 rounded z-10 absolute top-full right-0 mt-1 w-[40vw]"
        >
          <h5 className="text-lg font-bold">Theme</h5>

          <div className="p-2">
            <div className="grid grid-cols-3 gap-1">
              {Object.values(AppTheme)
                .filter((value) => codeBlockThemeMap.has(value))
                .map((theme) => (
                  <input
                    type="radio"
                    name="theme-buttons"
                    className="btn theme-controller"
                    aria-label={theme.toString()}
                    value={theme}
                    onChange={() => setTheme(theme as AppTheme)}
                    checked={currentTheme === theme}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
