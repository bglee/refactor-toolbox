import React from "react";
import { Settings } from "../settings/Settings";
import { GitMenu } from "../git/GitMenu";
import { NavigationSearch } from "./NavigationSearch";
export const HeaderBar: React.FC = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <div className="pr-2">
          <NavigationSearch />
        </div>
      </div>
      <div className="flex-none">
        <span className="font-bold pr-1">Project Refactor Id: </span>
        <span className="text-sm">#3</span>
      </div>
      <div className="flex-none ml-4">
        <span className="text-sm mr-2">Rename all variables to camelCase</span>
      </div>

      <div className="flex-none">
        <span className="text-sm ml-auto mr-2 font-bold">Refactor Commit Number:</span>
        <span className="text-sm ml-auto mr-2">0</span>
        <GitMenu />
      </div>
      <div className="flex-none">
        <Settings />
      </div>
    </div>
  );
};
