import { ASTNode } from "../../model/AstNode";
import { ASTNodeProvider, useASTNodeState } from "./ASTNodeContext";
import ASTNodeDisplay from "./ASTNodeDisplay";

export const ASTTree = <T extends string>(
  astNode: ASTNode,
  displayKeys: T[],
) => {
  const astNodeState = useASTNodeState();

  return (
    <ASTNodeProvider state={astNodeState}>
      <ASTNodeDisplay node={astNode} displayKeys={displayKeys} />
    </ASTNodeProvider>
  );
};
