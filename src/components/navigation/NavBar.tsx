import React from "react";
export const NavBar: React.FC = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <span className="text-xl">Refactor Toolbox</span>
        <span className="text-sm pl-2">v0.0</span>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>AST Browser</a>
          </li>
          <li>
            <a>Visualize jsCodeShift</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
