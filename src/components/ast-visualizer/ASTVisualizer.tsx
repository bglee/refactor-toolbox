import { ASTNode } from "../../model/AstNode";
import { ASTTree } from "./ASTTree";

type ASTVisualizerProps = {
  nodes: Record<string, ASTNode>;
  displayKeys: string[];
};

export const ASTVisualizer: React.FC<ASTVisualizerProps> = ({
  nodes,
  displayKeys,
}) => {
  return (
    <>
      {Object.entries(nodes).map(([key, node]) => (
        <ASTTree key={key} astNode={node} displayKeys={displayKeys} />
      ))}
    </>
  );
};
