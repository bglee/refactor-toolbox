import { useMemo } from "react";
import { ASTNode } from "../model/AstNode";
import * as recast from "recast";

export const useAstParser = (content: string): ASTNode | null => {
  try {
    const ast = useMemo(() => recast.parse(content), [content]);
    return ast.program;
  } catch (error) {
    console.error("Failed to parse AST:", error);
    return null;
  }
};
