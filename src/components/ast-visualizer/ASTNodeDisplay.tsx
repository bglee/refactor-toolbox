import React from "react";
import { pathBuilder, useNodes } from "./ASTNodeContext";
import { ASTNode, NodePropData } from "../../model/AstNode";
import { MaterialIcon } from "../common/MaterialIcon";
import { ASTContextMenu } from "./ASTContextMenu";
import { useContextMenuStore } from "../../store/store-hooks/useContextMenuStore";

interface ASTNodeDisplayProps {
  displayKeys: string[];
  node: ASTNode;
  parentPath?: string;
  index?: number;
}

/*
 * ASTNode Component
 * This component is used to render the AST nodes.
 * It takes a node object as a prop and renders it.
 */

// TODO: Consider using windowing/virtualization (e.g., react-window) to optimize rendering large numbers of AST nodes and improve performance. 
const ASTNodeDisplay: React.FC<ASTNodeDisplayProps> = ({
  displayKeys,
  node,
  parentPath = "root",
  index = 0,
}) => {
  const path = pathBuilder(node, parentPath, index);
  const { state, setState } = useNodes(path);
  const { contextMenu, setContextMenu } = useContextMenuStore();

  const renderValue = (value: NodePropData, key: string, index: number): JSX.Element => {
    // Handle null/undefined
    if (value === null || value === undefined) {
      return <span className="hs-accordion__value">EMPTY</span>;
    }

    // Handle primitive types
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      return <span className="hs-accordion__value text-warning">{JSON.stringify(value)}</span>;
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return (
        <>
          <span className="text-secondary/80 pl-2">{`Array [${value.length}] ${value.length > 0 ? "{" : ""}`}</span>
          {value.length > 0 && (
            <>
              <div className="pl-2">
                {value.map((item, idx) => (
                  <ASTNodeDisplay
                    displayKeys={displayKeys}
                    node={item as ASTNode}
                    key={idx}
                    parentPath={path}
                    index={idx}
                  />
                ))}
              </div>
              <div className="text-secondary/80">{"}"}</div>
            </>
          )}
        </>
      );
    }

    // Handle objects/nodes
    return (
      <div className="pl-2">
        <ASTNodeDisplay
          displayKeys={displayKeys}
          node={value as ASTNode}
          parentPath={path}
          index={index}
        />
      </div>
    );
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, nodeId: path });
  };

  return (
    <div key={path}>
      <div className="flex items-center">
       
        <button 
          className="pr-2 text-left text-primary text-lg" 
          onClick={() => 
              setState(!state)
           }
          onContextMenu={handleContextMenu}
        >
          {node.type || "Object"}{" "}
        </button>
        {Object.entries(node).filter(([key]) => !displayKeys.includes(key)).length > 0 && (
          <div
            className="tooltip tooltip-bottom hover:cursor-default"
            data-tip={
              "[" +
              Object.entries(node)
                .filter(([key]) => !displayKeys.includes(key))
                .map(([key]) => key)
                .join(", ") +
              "]"
            }
          >
            <span className="text-xs italic pl-1 text-secondary/30">{`${Object.entries(node).filter(([key]) => !displayKeys.includes(key)).length} hidden properies`}</span>
          </div>
        )}
      </div>
      {state && (
        <div className="w-full text-left pl-3">
          <ul>
            {Object.entries(node)
              .filter(([key]) => displayKeys.includes(key))
              .map(([key, value], index) => (
                <li key={key}>
                  <span className="hs-accordion__key">{key}: </span>
                  {renderValue(value, key, index)}
                </li>
              ))}
             {Object.entries(node).filter(([key]) => displayKeys.includes(key)).length == 0 && <li className="opacity-50 italic">No visible properties to display.</li>}
          </ul>
        </div>
      )}
    </div>
  );
};
export default ASTNodeDisplay;

