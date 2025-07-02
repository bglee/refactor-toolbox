import React from "react";
import { pathBuilder, useNodes } from "./ASTNodeContext";
import { ASTNode, NodePropData } from "../../model/AstNode";
import { useContextMenuStore } from "../../store/store-hooks/useContextMenuStore";
import { useKeyVisibilityStore } from "../../store/store-hooks/useKeyVisibilityStore";

interface ASTNodeDisplayProps {
  displayKeys: string[];
  node: ASTNode;
  parentPath?: string;
  index?: number;
}

const copyNodeForContextMenu = (node: ASTNode): ASTNode => {
    const nodeCopy: ASTNode = {};
    for (const [key, value] of Object.entries(node)) {
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        value === null ||
        value === undefined
      ) {
        nodeCopy[key] = value;
      } else if (Array.isArray(value)) {
        // For arrays, just store the length
        nodeCopy[key] = `Array[${value.length}]`;
      } else if (typeof value === "object") {
        // For objects, just store the tree_key if available
        nodeCopy[key] = copyNodeForContextMenu(value as ASTNode);
      }
    }
    return nodeCopy;
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
  const { setContextMenu } = useContextMenuStore();
  const { setKeyVisibility } = useKeyVisibilityStore();
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

    // Create a shallow copy of the node with only top-level properties
    const nodeCopy = copyNodeForContextMenu(node);

    setContextMenu({ x: event.clientX, y: event.clientY, astBrowserContext: {node: nodeCopy, nodePath: path} });
  };

  return (
    <div key={path}>
      <div className="flex items-center">
        <button
          className="pr-2 text-left text-primary text-lg"
          onClick={() => setState(!state)}
          onContextMenu={handleContextMenu}
        >
          {node.tree_key || "Object"}{" "}
        </button>
        {Object.entries(node).filter(([key]) => !displayKeys.includes(key)).length > 0 && (
          <>
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
            <button
              className="text-sm underline italic pl-1 text-secondary/30"
              onClick={() =>
                setKeyVisibility([
                  ...displayKeys,
                  ...Object.entries(node)
                    .filter(([key]) => !displayKeys.includes(key))
                    .map(([key]) => key),
                ])
              }
            >
              Show all
            </button>
          </>
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
            {Object.entries(node).filter(([key]) => displayKeys.includes(key)).length == 0 && (
              <li className="opacity-50 italic">No visible properties to display.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
export default ASTNodeDisplay;
