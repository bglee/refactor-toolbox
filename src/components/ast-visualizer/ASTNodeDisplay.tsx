import React from "react";
import { pathBuilder, useNodes } from "./ASTNodeContext";
import { ASTNode, NodePropData } from "../../model/AstNode";

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
const ASTNodeDisplay: React.FC<ASTNodeDisplayProps> = ({
  displayKeys,
  node,
  parentPath = "root",
  index = 0,
}) => {
  const path = pathBuilder(node, parentPath, index);
  const { state, setState } = useNodes(path);

  const renderValue = (
    value: NodePropData,
    key: string,
    index: number,
  ): JSX.Element => {
    // Handle null/undefined
    if (value === null || value === undefined) {
      return <span className="hs-accordion__value">EMPTY</span>;
    }

    // Handle primitive types
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return (
        <span className="hs-accordion__value">{JSON.stringify(value)}</span>
      );
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return (
        <>
          <span className="text-green-500 pl-2">
            {value.length === 0 ? "Array[empty]" : "Array ["}
          </span>
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
              <div className="text-green-500">{"]"}</div>
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

  return (
    <div key={path}>
      <button
        className="w-full text-left text-sky-400 text-lg"
        onClick={() => setState(!state)}
      >
        {node.type || "Object"}
      </button>
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
          </ul>
        </div>
      )}
    </div>
  );
};

export default ASTNodeDisplay;
