import { ASTNode } from "./AstNode";

export interface ModalState {
  modalKey: string;
  astBrowserContext: {
    node: ASTNode;
    nodePath: string;
  };
}
