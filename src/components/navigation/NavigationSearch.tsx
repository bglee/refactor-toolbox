import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MaterialIcon } from "../common/MaterialIcon";
import { useNavigate } from "@tanstack/react-router";

/**
 * Why a portal for the dropdown?
 *
 * The code viewer (and other components) can introduce their own stacking contexts
 * via position/transform/filters. In those cases, even very large z-index values on
 * an absolutely positioned dropdown can still render underneath those contexts.
 *
 * Rendering the dropdown in a portal attached to document.body and positioning it
 * using fixed coordinates derived from getBoundingClientRect() ensures the surface
 * always appears above any local stacking contexts created elsewhere in the app.
 *
 * Considerations handled here:
 * - Positioning: We compute left/top/width from the input container's bounding rect
 *   and update on open, window resize, and scroll (including nested scroll containers).
 * - Outside click: Because the dropdown lives outside of the input container subtree,
 *   the outside-click logic must consider both the input container and the portal node.
 * - Z-index: We use a body-level fixed element with a high z-index so it layers above
 *   code highlights and other overlays.
 * - Accessibility/UX: Escape closes the dropdown; clicking the container reopens it.
 * - Cleanup: All global event listeners are attached only while needed and are removed
 *   on teardown to avoid leaks.
 */

const navigationMenuItems = [
  {
    label: "Home",
    icon: "home",
    path: "/",
  },
  {
    label: "AST Search",
    icon: "search",
    path: "/ast_power_search",
  },
  {
    label: "Dev Tools",
    icon: "code",
    path: "/dev_tools",
  },
  {
    label: "Settings",
    icon: "settings",
    path: "/settings",
  },
  {
    label: "Help",
    icon: "help",
    path: "/help",
  },
];

export const NavigationSearch: React.FC = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownRect, setDropdownRect] = useState<{ left: number; top: number; width: number }>({
    left: 0,
    top: 0,
    width: 0,
  });

  const navigate = useNavigate();

  const filteredNavigationMenuItems = navigationMenuItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const dropdownActive = searchFocused;

  // Compute and cache the input rect for fixed-positioned dropdown
  const updateRect = () => {
    const el = searchRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setDropdownRect({ left: rect.left, top: rect.bottom, width: rect.width });
  };

  // Handle clicks outside the component (including portal dropdown)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        searchRef.current &&
        !searchRef.current.contains(target) &&
        (!dropdownRef.current || !dropdownRef.current.contains(target))
      ) {
        setSearchFocused(false);
      }
    };

    if (dropdownActive) {
      document.addEventListener("mousedown", handleClickOutside);
      updateRect();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownActive]);

  // Reposition on resize/scroll when open
  useEffect(() => {
    if (!dropdownActive) return;
    const onRecalc = () => updateRect();
    window.addEventListener("resize", onRecalc);
    window.addEventListener("scroll", onRecalc, true);
    updateRect();
    return () => {
      window.removeEventListener("resize", onRecalc);
      window.removeEventListener("scroll", onRecalc, true);
    };
  }, [dropdownActive]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClick = () => {
    setSearchFocused(true);
    updateRect();
    searchRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredNavigationMenuItems.length === 1) {
      navigate({ to: filteredNavigationMenuItems[0].path });
      setSearchFocused(false);
    } else if (searchFocused === false) {
      setSearchFocused(true);
      updateRect();
      searchRef.current?.focus();
    } else if (e.key === "Escape") {
      setSearchFocused(false);
    }
  };

  return (
    <div className="flex-none relative" ref={searchRef} onClick={handleClick}>
      <div
        id="input"
        className={`w-full bg-base-100 border border-base-300 flex items-center gap-2 px-3 py-2 ${dropdownActive ? "rounded-t-xl" : "rounded-xl"} shadow-sm focus-within:ring-2 focus-within:ring-primary/30`}
      >
        <div className="cursor-pointer flex items-center justify-center text-base-content/60">
          <MaterialIcon name="menu" />
        </div>
        <input
          value={search}
          className="w-full bg-transparent focus:outline-none placeholder:text-base-content/50"
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
        />
      </div>
      {dropdownActive &&
        createPortal(
          <div
            ref={dropdownRef}
            className="bg-base-100 border border-base-300 z-50 p-2 fixed max-h-[70vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-base-400 scrollbar-track-base-200 rounded-b-xl shadow-md"
            style={{
              left: dropdownRect.left,
              top: dropdownRect.top,
              width: dropdownRect.width,
              minWidth: 140,
            }}
          >
            {filteredNavigationMenuItems.map((item) => (
              <div
                className="py-2 px-3 flex items-center justify-start hover:bg-primary/10 rounded-lg cursor-pointer transition-colors"
                key={item.label}
                onClick={() => navigate({ to: item.path })}
              >
                <MaterialIcon name={item.icon} className="px-2" />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};
