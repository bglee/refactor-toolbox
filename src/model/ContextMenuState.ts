import { ASTNode } from "./AstNode";

export interface ContextMenuState {
  x: number;
  y: number;
  astBrowserContext:{
node: ASTNode;
  nodePath: string;
  }
  
}
