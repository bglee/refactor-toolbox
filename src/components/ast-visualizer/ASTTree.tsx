import { ASTNode } from "../../model/AstNode";
import { ASTNodeProvider, useASTNodeState } from "./ASTNodeContext";
import ASTNodeDisplay from "./ASTNodeDisplay";
import { ASTContextMenu } from "./ASTContextMenu";

type ASTTreeProps = {
  astNode: ASTNode;
  displayKeys: string[];
};

export const ASTTree: React.FC<ASTTreeProps> = ({ astNode, displayKeys }) => {
  const astNodeState = useASTNodeState();
  return (
    <>
      <ASTNodeProvider state={astNodeState}>
        <ASTNodeDisplay node={astNode} displayKeys={displayKeys} />
      </ASTNodeProvider>
      <ASTContextMenu />
    </>
  );
};
