import { ASTNode } from "./AstNode";

export type AstState = { node: ASTNode | null; codeChecksum: string };
