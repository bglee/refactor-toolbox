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
  type?: string;
  [key: string]: NodePropData;
}
