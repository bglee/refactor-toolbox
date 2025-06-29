import { useState } from "react";
import { useFilteredASTNodes } from "../../store/second-order-data-hooks/useFilteredASTNodes";
import { useKeyVisibilityStore } from "../../store/store-hooks/useKeyVisibilityStore";
import { ASTTree } from "./ASTTree";


const debugFlag = false;

export const ASTVisualizer: React.FC = ({
}) => {
  const { keyVisibility } = useKeyVisibilityStore();
  const filteredASTNodes = useFilteredASTNodes();

  const [displayType, setDisplayType] = useState<"tree" | "json">("tree");
  if(debugFlag) {
    setDisplayType("tree");
  }
  return (
    <>
      {debugFlag && <div className="flex flex-row gap-2">
        <button className="border border-neutral rounded-md p-1" onClick={() => setDisplayType("tree")}>Tree</button>
        <button className="border border-neutral rounded-md p-1" onClick={() => setDisplayType("json")}>JSON</button>
      </div>}
      {displayType === "tree" ? (
        Object.entries(filteredASTNodes).map(([key, node]) => (
          <ASTTree key={key} astNode={node} displayKeys={keyVisibility} />
        ))
      ) : (
        <div className="text-sm overflow-x-auto max-w-full whitespace-pre-wrap">
          {JSON.stringify(filteredASTNodes, null, 2)}
        </div>
      )}
    </>
  );
};
