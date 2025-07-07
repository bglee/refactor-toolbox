import React, { useRef, useState, useEffect } from "react";
import { MaterialIcon } from "../common/MaterialIcon";
import { useNavigate } from "@tanstack/react-router";

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
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState("25%");

  const navigate = useNavigate();

  const filteredNavigationMenuItems = navigationMenuItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const dropdownActive = searchFocused;

  // Handle clicks outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };

    // Add event listener when dropdown is active
    if (dropdownActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownActive]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClick = () => {
    setSearchFocused(true);
    if (searchRef.current?.clientWidth) {
      setDropdownWidth(`${searchRef.current.clientWidth}px`);
    }
    searchRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredNavigationMenuItems.length === 1) {
      navigate({ to: filteredNavigationMenuItems[0].path });
      setSearchFocused(false);
    } else if (searchFocused === false) {
      setSearchFocused(true);
      searchRef.current?.focus();
    }
  };

  return (
    <div className="flex-none" ref={searchRef} onClick={handleClick}>
      <div
        id="input"
        className={`w-full bg-base-200 border-2 border-base-300 flex items-center p-1 ${dropdownActive ? "rounded-t-md" : "rounded-md"}`}
      >
        <div className="cursor-pointer flex items-center justify-center mr-2">
          <MaterialIcon name="menu" />
        </div>
        <input
          value={search}
          className="w-full bg-base-200/0 focus:outline-none"
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
        />
      </div>
      {dropdownActive && (
        <div
          className="bg-base-200 border border-base-300 z-10 p-1 absolute max-h-[80vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-base-400 scrollbar-track-base-200 rounded-b-md"
          style={{ width: dropdownWidth, minWidth: "140px" }}
        >
          {filteredNavigationMenuItems.map((item) => (
            <div
              className="py-1 px-2 flex items-center justify-start hover:bg-base-200 rounded-md cursor-pointer"
              key={item.label}
              onClick={() => navigate({ to: item.path })}
            >
              <MaterialIcon name={item.icon} className="px-2" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
