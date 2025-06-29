type BasicTypes = string | number | boolean | null | undefined;

interface NonNodeObject {
  [key: string]: BasicTypes;
}

export type NodePropData =
  | BasicTypes
  | ASTNode
  | NodePropData[]
  | NonNodeObject;

export interface ASTNode {
  tree_key?: string;
  [key: string]: NodePropData;
}
