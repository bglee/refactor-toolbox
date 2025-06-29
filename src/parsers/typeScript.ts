import { ASTNode } from "../model/AstNode";
import { LanguageInterface, ParserInterface } from "./_parser_interface";
import typescript from "typescript";

function insertTreeKey(node: any): any {
  if (!node || typeof node !== "object") return node;

  console.log(typescript.SyntaxKind[node.kind]);
  const tree_key = typescript.SyntaxKind[node.kind];

  // Create a shallow copy to avoid mutating the original node
  const newNode: any = { ...node, tree_key };

  // Recursively process all properties
  for (const key of Object.keys(node)) {
    const value = node[key];

    // Skip the parent property to avoid infinite recursion on render
    if (key === "parent") {
      newNode[key] = undefined;
      continue;
    }

    if (Array.isArray(value)) {
      // If it's an array, map over it and transform any nodes
      newNode[key] = value.map((item) => insertTreeKey(item));
    } else if (value && typeof value === "object" && "kind" in value) {
      // If it's a node, transform it
      newNode[key] = insertTreeKey(value);
    } else {
      // Otherwise, keep the value as is
      newNode[key] = value;
    }
  }

  return newNode;
}

class TypeScriptParser implements ParserInterface {
  parserId = "typescript";
  parse(code: string): ASTNode | null {
    const sourceFile = typescript.createSourceFile(
      "temp.ts",
      code,
      typescript.ScriptTarget.Latest,
      true
    );

    const ast = insertTreeKey(sourceFile);
    //TODO: The typescript ast is much more complex than the javascript ast, so we need to parse it differently
    return ast;
  }
}

export class TypeScript implements LanguageInterface {
  languageName = "typescript";
  fileExtension = "ts";
  parsers = [new TypeScriptParser()];

  parse(code: string, parserId: string): ASTNode | null {
    const parser = this.parsers.find((parser: ParserInterface) => parser.parserId === parserId);

    if (!parser) {
      throw new Error(`Parser ${parserId} not found`);
    }

    return parser.parse(code);
  }
}
