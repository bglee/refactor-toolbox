import { ASTNode } from "../../model/AstNode";
import { ASTTree } from "./ASTTree";

type ASTVisualizerProps = {
  mainNode: Record<string, ASTNode>;
  displayKeys: string[];
};

export const ASTVisualizer: React.FC<ASTVisualizerProps> = ({
  mainNode,
  displayKeys,
}) => {
  return (
    <>
      {Object.entries(mainNode).map(([key, node]) => (
        <ASTTree key={key} astNode={node} filteredSearchKeys={displayKeys} />
      ))}
    </>
  );
};
