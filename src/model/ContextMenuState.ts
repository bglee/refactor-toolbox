import { ASTNode } from "./AstNode";

export interface ContextMenuState {
  x: number;
  y: number;
  node: ASTNode;
  nodePath: string;
}
