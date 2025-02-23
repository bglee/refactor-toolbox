import React, { useRef, useEffect, useState } from "react";
import { MaterialIcon } from "../common/MaterialIcon";

export const Settings: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme") || "default");
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleThemeChange = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setCurrentTheme(theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      handleThemeChange(savedTheme);
    }
  }, []);

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
              <input
                type="radio"
                name="theme-buttons"
                className="btn theme-controller"
                aria-label="Default"
                value="default"
                onChange={() => handleThemeChange("default")}
                checked={currentTheme === "default"}
              />
              <input
                type="radio"
                name="theme-buttons"
                className="btn theme-controller"
                aria-label="Retro"
                value="retro"
                onChange={() => handleThemeChange("retro")}
                checked={currentTheme === "retro"}
              />
              <input
                type="radio"
                name="theme-buttons"
                className="btn theme-controller"
                aria-label="Cyberpunk"
                value="cyberpunk"
                onChange={() => handleThemeChange("cyberpunk")}
                checked={currentTheme === "cyberpunk"}
              />
              <input
                type="radio"
                name="theme-buttons"
                className="btn theme-controller"
                aria-label="Valentine"
                value="valentine"
                onChange={() => handleThemeChange("valentine")}
                checked={currentTheme === "valentine"}
              />
              <input
                type="radio"
                name="theme-buttons"
                className="btn theme-controller"
                aria-label="Aqua"
                value="aqua"
                onChange={() => handleThemeChange("aqua")}
                checked={currentTheme === "aqua"}
              />
              <input
                type="radio"
                name="theme-buttons"
                className="btn theme-controller"
                aria-label="Cupcake"
                value="cupcake"
                onChange={() => handleThemeChange("cupcake")}
                checked={currentTheme === "cupcake"}
              />
              <input
                type="radio"
                name="theme-buttons"
                className="btn theme-controller"
                aria-label="Dracula"
                value="dracula"
                onChange={() => handleThemeChange("dracula")}
                checked={currentTheme === "dracula"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
